import Lesson from "./Lesson";

type Course = {
  id: string;
  name: string;
  url: string;
  published: boolean;
  picUrl: string;
  description: string;
  lessons: Lesson[];
};

export default Course;