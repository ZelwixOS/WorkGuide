import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourseByUrl } from '../../Request/GetRequests'
import { makeStyles } from '../../theme'
import Course from '../../Types/Course'
import Loading from '../Common/Loading'
import NavigationBar from '../Common/NavigationBar'
import LessonCard from '../Lesson/LessonCard'
import CourseCard from './CourseCard'

const useStyles = makeStyles()((theme) => ({
  backButtons: {
    marginTop: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  linkButton: {
    width: '100%',
    marginTop: '2rem',
    color: 'purple',
    border: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: 'purple',
      color: 'white',
    },
  },
}))

const CoursePage = () => {
  const { classes, cx } = useStyles()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const params = useParams()
  let isMounted = true

  const openCourseListPageClick = () => {
    navigate(`/courses`)
  }

  const getCourses = async (isMounted: boolean, url: string) => {
    const res = await getCourseByUrl(url)
    if (isMounted) {
      setCourse(res)
      setLoading(false)
    }
  }

  useEffect(() => {
    getCourses(isMounted, params?.url as string)

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <NavigationBar />
      <Container className={classes.container}>
        {isLoading || !course ? <Loading /> : <CourseCard course={course} />}
        {isLoading || !course
          ? null
          : course.lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
        <Row className={classes.backButtons}>
          <Col>
            <Button
              className={classes.linkButton}
              variant="outline-primary"
              onClick={() => openCourseListPageClick()}
            >
              К моим курсам
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CoursePage
