import Test from "./Test";
import Theory from "./Theory";

type Lesson = {
  id: string;
  name: string;
  orderNumber: number;
  courseUrl: string;
  isComplexTest: boolean;
  courseId: string;
  courseName: string;
  theoryPages: Theory[];
  testPages: Test[];
  finished: boolean;
};

export default Lesson;