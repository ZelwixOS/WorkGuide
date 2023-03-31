namespace BLL.DTO.Request.Answer
{
    public class AnswerCreateRequestDto : AnswerRequestDto
    {
        public override DAL.Entities.Answer ToModel()
        {
            return new DAL.Entities.Answer()
            {
                Content = this.Content,
                IsValid = this.IsValid,
                TestId = this.TestId
            };
        }
    }
}
