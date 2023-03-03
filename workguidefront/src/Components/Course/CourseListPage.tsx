import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { getCourses } from "../../Request/GetRequests";
import Course from "../../Types/Course";
import CourseCard from "./CourseCard";

const CourseListPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const itemsOnPage = 10;
  let isMounted = true

  const getCoursesForPage = async (isMounted: boolean) => {
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

  useEffect(() => {

    getCoursesForPage(isMounted);

    return () => {
      isMounted = false
    }
  }, [page]);

  return (
    <Container>
      {isLoading ? null : courses.map(course => <CourseCard key={course.id} course={course} useAnimation />)}
      {isLoading || maxPage <= 1 ? null : <ReactPaginate
        nextLabel=">"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={maxPage}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination d-flex justify-content-center"
        activeClassName="active"
        renderOnZeroPageCount={() => null}
      />}
    </Container>
  );
}

export default CourseListPage;