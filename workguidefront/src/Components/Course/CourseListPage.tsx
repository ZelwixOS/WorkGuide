import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../Request/GetRequests";
import { makeStyles } from "../../theme";
import Course from "../../Types/Course";
import Loading from "../Common/Loading";
import NavigationBar from "../Common/NavigationBar";
import Paginate from "../Common/Paginate";
import CourseCard from "./CourseCard";

const useStyles = makeStyles()((theme) => ({
  backButtons: {
    marginTop: 'auto',
    paddingTop: '1rem'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    textAlign: 'left'
  },
  linkButton: {
    width: '100%',
    color: 'purple',
    border: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    "&:hover": {
      "backgroundColor": 'purple',
      "color": 'white'
    }
  }
}))

const CourseListPage = () => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const itemsOnPage = 10;
  let isMounted = true

  const getCoursesForPage = async (isMounted: boolean) => {
    setLoading(true);
    const res = await getCourses(
      page,
      itemsOnPage
    )
    if (isMounted) {
      setCourses(res.data);
      setMaxPage(res.maxPage);
      setLoading(false);
    }
  }

  const changePage = (page: number) => {
    setPage(page);
  }

  useEffect(() => {
    getCoursesForPage(isMounted);

    return () => {
      isMounted = false
    }
  }, [page]);

  return (
    <>
    <NavigationBar />
    <Container className={classes.container}>
      <h3>Список курсов</h3>
      <h5 className="mb-4">Здесь хранятся все доступные Вам курсы</h5>
      {isLoading ? <Loading /> : courses.map(course => <CourseCard key={course.id} course={course} listItem />)}

      <Row className={classes.backButtons}>
        <Paginate initialPage={page} maxPage={maxPage} onPageChange={changePage} loading={isLoading} />
      </Row>
    </Container>
    </>
  );
}

export default CourseListPage;