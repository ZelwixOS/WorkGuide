using DAL.Entities;

namespace BLL.DTO.Response
{
    public class RecruitLessonResultDto
    {
        public RecruitLessonResultDto(Lesson lesson, UserLessonScoreDto score)
        {
            Lesson = lesson;
            Score = score;
        }

        public Lesson Lesson { get; set; }

        public UserLessonScoreDto Score { get; set; }
    }
}
