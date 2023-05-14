import Course from "./Course";
import RecruitLessonResult from "./RecruitLessonResult";

type RecruitCourseResult = {
  completeLesson: number;
  total: number;
  resultLesson: RecruitLessonResult[];
  course: Course;
};

export default RecruitCourseResult;
