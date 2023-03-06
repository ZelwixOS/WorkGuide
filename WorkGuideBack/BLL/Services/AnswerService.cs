using BLL.DTO.Request.Answer;
using BLL.DTO.Response;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL.Services
{
    public class AnswerService : IAnswerService
    {
        private IAnswerRepository answerRepository;

        public AnswerService(IAnswerRepository answerRepository)
        {
            this.answerRepository = answerRepository;
        }

        public AnswerDto GetAnswer(Guid id)
        {
            var answer = this.answerRepository.GetItem(id);
            if (answer != null)
            {
                return new AnswerDto(answer);
            }

            return null;
        }

        public AnswerDto CreateAnswer(AnswerCreateRequestDto answer)
        {
            var answerMod = answer.ToModel();
            var res = this.answerRepository.CreateItem(answerMod);

            return new AnswerDto(res);
        }

        public AnswerDto UpdateAnswer(AnswerUpdateRequestDto answer)
        {
            var answEntity = this.answerRepository.GetItem(answer.Id);

            if (answEntity == null)
            {
                return null;
            }

            var answerMod = answer.ToModel();
            var answerEntity = this.answerRepository.UpdateItem(answerMod);

            return new AnswerDto(answerEntity);
        }

        public int DeleteAnswer(Guid id)
        {
            var answer = this.answerRepository.GetItem(id);
            if (answer != null)
            {
                return this.answerRepository.DeleteItem(answer);
            }
            else
            {
                return 0;
            }
        }
    }
}
