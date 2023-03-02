using BLL.DTO.Request.Answer;
using BLL.DTO.Response;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL.Services
{
    public class AnswerService : IAnswerService
    {
        private IAnswerRepository answerService;

        public AnswerService(IAnswerRepository answerRepository)
        {
            this.answerService = answerRepository;
        }

        public AnswerDto GetAnswer(Guid id)
        {
            var answer = this.answerService.GetItem(id);
            if (answer != null)
            {
                return new AnswerDto(answer);
            }

            return null;
        }

        public AnswerDto CreateAnswer(AnswerCreateRequestDto answer)
        {
            var answerMod = answer.ToModel();
            var res = this.answerService.CreateItem(answerMod);

            return new AnswerDto(res);
        }

        public AnswerDto UpdateAnswer(AnswerUpdateRequestDto answer)
        {
            var answEntity = this.answerService.GetItem(answer.Id);

            if (answEntity == null)
            {
                return null;
            }

            var answerMod = answer.ToModel();
            var answerEntity = this.answerService.UpdateItem(answerMod);

            return new AnswerDto(answerEntity);
        }

        public int DeleteAnswer(Guid id)
        {
            var answer = this.answerService.GetItem(id);
            if (answer != null)
            {
                return this.answerService.DeleteItem(answer);
            }
            else
            {
                return 0;
            }
        }
    }
}
