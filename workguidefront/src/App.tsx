import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CoursePage from './Components/Course/CoursePage';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={<h2>Главная</h2>} />
          <Route path="/courses">
            <Route index element={<h2>Список курсов</h2>} />
            <Route path=":url" element={<CoursePage />} />
          </Route>
          <Route path="*" element={<h2>Ресурс не найден</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
