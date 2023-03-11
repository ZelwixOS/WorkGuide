import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CoursePage from './Components/Course/CoursePage';
import CourseListPage from './Components/Course/CourseListPage';
import LessonPage from './Components/Lesson/LessonPage';
import NavigationBar from './Components/Common/NavigationBar';
import UserPage from './Components/User/UserPage';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/achievments" element={<h2>Достижения</h2>} />
          <Route path="/courses">
            <Route index element={<CourseListPage />} />
            <Route path=":url" element={<CoursePage />} />
            <Route path=":url/:lessonNumber" element={<LessonPage />} />
          </Route>
          <Route path="*" element={<h2>Ресурс не найден</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
