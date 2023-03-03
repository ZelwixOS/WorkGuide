import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseByUrl } from "../../Request/GetRequests";
import Course from "../../Types/Course";
import LessonCard from "../Lesson/LessonCard";
import CourseCard from "./CourseCard";

const CoursePage = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const params = useParams();
  let isMounted = true

  const openCourseListPageClick = () => {
    navigate(`/courses`);
  } 

  const openMainPageClick = () => {
    navigate(``);
  }

  const getCourses = async (isMounted: boolean, url: string) => {
    const res = await getCourseByUrl(
      url
    )
    if (isMounted) {
      setCourse(res);
      setLoading(false);
    }
  }

  useEffect(() => {
    getCourses(isMounted, params?.url as string);

    return () => {
      isMounted = false
    }
  }, []);

  return (
    <Container>
      {isLoading || !course ? null : <CourseCard course={course} />}
      {isLoading || !course ? null : course.lessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} useAnimation />)}
      <Row className="mt-4">
        <Col><Button className="w-100" variant="outline-primary" onClick={()=>openMainPageClick()}>Главная страница</Button></Col>
        <Col><Button className="w-100" variant="outline-primary" onClick={()=>openCourseListPageClick()}>Список курсов</Button></Col>
      </Row>
    </Container>
  );
}

export default CoursePage;