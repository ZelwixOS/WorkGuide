using BLL.Interfaces;

namespace BLL.DTO.Request.Answer
{
    public class TestAnswerRequestDto : IDtoMapper<DAL.Entities.Answer>
    {
        public string Content { get; set; }
        public bool IsValide { get; set; }

        public DAL.Entities.Answer ToModel()
        {
            return new DAL.Entities.Answer()
            {
                Content = this.Content,
                IsValid = this.IsValide,
            };
        }
    }
}
