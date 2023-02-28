import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCourseByUrl } from "../../Request/GetRequests";
import Course from "../../Types/Course";


function CoursePage() {
  const [course, setCourse] = useState<Course | null>(null);
  const params = useParams();
  let isMounted = true

  const getCourses = async (isMounted: boolean, url: string) => {
    const res = await getCourseByUrl(
      url
    )
    if (isMounted) {
      setCourse(res);
    }
  }

  useEffect(() => {
    getCourses(isMounted, params?.url as string);

    return () => {
      isMounted = false
    }
  }, []);

  return (
    <div className="h-100 d-flex align-items-center">
      <Card style={{ width: '70%' }} className="shadow d-flex align-items-center m-auto">
        <Card.Img variant="top" src={course?.picUrl} style={{ width: '20%' }} />
        <Card.Body>
          <Card.Title>{course?.name}</Card.Title>
          <Card.Text>
            {course?.description}
          </Card.Text>
          <Button variant="success">Перейти к урокам</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CoursePage;