import Answer from "./Answer";

type Test = {
  id: string;
  pageNumber: number;
  lessonName: string;
  courseUrl: string;
  lessonNumber: number;
  content: string;
  answers: Answer[];
  isManyAnswer: boolean;
};

export default Test;