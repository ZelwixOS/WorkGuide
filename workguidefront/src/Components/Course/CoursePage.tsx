import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCourseByUrl } from "../../Request/GetRequests";
import Course from "../../Types/Course";


function CoursePage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const params = useParams();
  let isMounted = true

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
    <div className="h-100 d-flex align-items-center">
      <Card style={{ width: '70%' }} className="shadow d-flex align-items-center m-auto">
        <Card.Img variant="top" src={isLoading ? undefined : '/coursePics/' + course?.picUrl } style={{ width: '200px', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: '10px', margin: '10px 0px' }} />
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