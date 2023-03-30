using BLL.Interfaces;

namespace BLL.DTO.Request.Answer
{
    public abstract class AnswerRequestDto : IDtoMapper<DAL.Entities.Answer>
    {
        public string Content { get; set; }

        public Guid TestId { get; set; }

        public bool IsValid { get; set; }

        public abstract DAL.Entities.Answer ToModel();
    }
}
