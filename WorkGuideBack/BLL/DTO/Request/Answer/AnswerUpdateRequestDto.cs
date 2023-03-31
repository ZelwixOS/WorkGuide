namespace BLL.DTO.Request.Answer
{
    public class AnswerUpdateRequestDto : AnswerRequestDto
    {
        public Guid Id { get; set; }

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
