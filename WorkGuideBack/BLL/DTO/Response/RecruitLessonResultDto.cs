using DAL.Entities;

namespace BLL.DTO.Response
{
    public class RecruitLessonResultDto
    {
        public RecruitLessonResultDto(Lesson lesson, UserLessonScoreDto score)
        {
            Lesson = new LessonDto(lesson);
            Score = score;
        }

        public LessonDto Lesson { get; set; }

        public UserLessonScoreDto Score { get; set; }
    }
}
