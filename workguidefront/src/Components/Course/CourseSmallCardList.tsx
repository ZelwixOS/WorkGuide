import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { getCourses } from '../../Request/GetRequests'
import { makeStyles } from '../../theme'
import Course from '../../Types/Course'
import Loading from '../Common/Loading'
import CourseSmallCard from './CourseSmallCard'

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  moreCourses: {
    textAlign: 'right'
  },
  link: {
    color:'#5227CC',
    textDecoration: 'none',
    transition: 'color 0.5s',
    '&:hover': {
      color: '#000'
    }
  }
}))

const CourseSmallCardList = () => {
  const { classes, cx } = useStyles()

  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)
  const itemsOnPage = 2;
  const page = 1;

  let isMounted = true

  const getCoursesForPage = async (isMounted: boolean) => {
    setLoading(true)
    const res = await getCourses(page, itemsOnPage)
    if (isMounted) {
      setCourses(res.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    getCoursesForPage(isMounted)

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Container className={classes.container}>
      <Row>
        <Col><h5>Мои курсы</h5></Col>
        <Col className={classes.moreCourses + ' p-0 pt-1'}><a href='/courses' className={classes.link}>Больше курсов</a></Col>
      </Row>
      {isLoading ? (
        <Loading />
      ) : (
        <Row>
          {courses.map(course => (
            <Col key={course.id} className='pe-0 py-0'>
              <CourseSmallCard key={course.id} course={course} listItem />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default CourseSmallCardList;
