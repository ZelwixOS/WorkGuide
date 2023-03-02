using DAL.Entities;

namespace BLL.DTO.Response
{
    public class AnswerDto
    {
        public AnswerDto(Answer answer)
        {
            this.Content = answer.Content;

            this.Id = answer.Id;
        }

        public string Content { get; set; }

        public Guid Id { get; set; }
    }
}
