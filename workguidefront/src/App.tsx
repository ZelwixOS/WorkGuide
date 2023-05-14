import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CoursePage from './Components/Course/CoursePage'
import { CoursePage as AdministrationCourses } from './Components/Administration/Pages/CoursePage'
import CourseListPage from './Components/Course/CourseListPage'
import LessonPage from './Components/Lesson/LessonPage'
import { AdminPage } from './Components/Administration/Pages/AdminPage'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { WorkersPage } from './Components/Administration/Pages/WorkersPage'
import UserPage from './Components/User/UserPage';
import { PositionPage } from './Components/Administration/Pages/PositionPage'
import { LessonPage as AdministrationLessonPage } from './Components/Administration/Pages/LessonPage'
import CreatePage from './Components/Administration/Lesson/CreatePage'
import RecruitsPage from './Components/Recruits/RecruitsPage'

const innerTheme = createTheme({
  palette: {
    primary: {
      main: '#924FFF',
    },
    secondary: {
      main: '#FFF',
    },
    background: {
      default: '#edf2f2',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={innerTheme}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<UserPage/>} />
            <Route path="/recruits" element={<RecruitsPage />} />
            <Route path="/courses">
              <Route index element={<CourseListPage />} />
              <Route path=":url" element={<CoursePage />} />
              <Route path=":url/:lessonNumber" element={<LessonPage />} />
            </Route>
            <Route path="/admin">
            <Route index element={<AdminPage />} />
              <Route path='workers' element={<WorkersPage />} />
              <Route path='courses' element={<AdministrationCourses />} />
              <Route path='positions' element={<PositionPage />} />
              <Route path='lessons'>
                <Route index element={<AdministrationLessonPage />} />
                <Route path=":id/:pageNumber" element={<CreatePage />} />
              </Route>
            </Route>
            <Route path="*" element={<h2>Ресурс не найден</h2>} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
