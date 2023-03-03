import Test from "./Test";
import Theory from "./Theory";

type Lesson = {
  id: string;
  name: string;
  orderNumber: number;
  courseUrl: string;
  courseName: string;
  theoryPages: Theory[];
  testPage: Test[];
};

export default Lesson;