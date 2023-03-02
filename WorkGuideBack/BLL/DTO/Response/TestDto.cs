using DAL.Entities;

namespace BLL.DTO.Response
{
    public class TestDto
    {
        public TestDto(Test test)
        {
            this.Id = test.Id;

            this.Content = test.Content;

            if (test.Question != null)
            {

            }
        }

        public Guid Id { get; set; }

        public string Content { get; set; }

        public List<AnswerDto> Answers { get; set; }
    }
}
