using BLL.DTO.Request.Answer;
using BLL.DTO.Response;

namespace BLL.Interfaces
{
    public interface IAnswerService
    {
        AnswerDto CreateAnswer(AnswerCreateRequestDto answer);
        int DeleteAnswer(Guid id);
        AnswerDto GetAnswer(Guid id);
        AnswerDto UpdateAnswer(AnswerUpdateRequestDto answer);
    }
}
