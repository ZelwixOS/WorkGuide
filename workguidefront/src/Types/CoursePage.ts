import Course from "./Course";

type CoursePage = {
  data: Course[];
  currentPage: number;
  maxPage: number;
};

export default CoursePage;