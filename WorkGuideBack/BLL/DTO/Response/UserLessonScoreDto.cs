using DAL.Entities;

namespace BLL.DTO.Response
{
    public class UserLessonScoreDto
    {
        public UserLessonScoreDto(UserLessonScore userLessonScore)
        {
            this.Id = userLessonScore.Id;
            this.RightAnswer = userLessonScore.RightAnswer;
            this.TestsCount = userLessonScore.TestsCount;
        }
        public Guid Id { get; set; }

        public int RightAnswer { get; set; }

        public int TestsCount { get; set; }
    }
}
