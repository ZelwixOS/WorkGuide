namespace BLL.DTO.Request.Test
{
    public class TestCreateRequestDto : TestRequestDto
    {
        public override DAL.Entities.Test ToModel()
        {
            return new DAL.Entities.Test()
            {
                Content = this.Content,
                PageNumer = this.PageNumer,
                LessonId = this.LessonId,
                IsManyAnswer = this.IsManyAnswer,
                Answers = this.Answers.Select(s => s.ToModel()).ToHashSet(),
            };
        }
    }
}
