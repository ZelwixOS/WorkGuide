type AchievementRequestModel = {
  id?: string;
  name: string;
  picFile: File | null;
  description: string;
  type: number;
  courseId: string | null;
  count: number| null;
  testScore: number;
};

export default AchievementRequestModel;