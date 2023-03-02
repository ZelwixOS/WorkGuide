import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseByUrl } from "../../Request/GetRequests";
import Course from "../../Types/Course";
import CourseCard from "../CourseCard/CourseCard";

const CoursePage = () => {
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
      {isLoading || !course ? null : <CourseCard course={course} />}
    </div>
  );
}

export default CoursePage;