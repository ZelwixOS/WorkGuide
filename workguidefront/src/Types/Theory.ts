import CustomFile from "./CustomFile";

type Theory = {
  id: string;
  pageNumber: number;
  content: string;
  lessonName: string;
  courseUrl: string;
  lessonNumber: number;
  files: CustomFile[];
};

export default Theory;