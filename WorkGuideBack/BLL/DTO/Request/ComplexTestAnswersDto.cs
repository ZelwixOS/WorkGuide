namespace BLL.DTO.Request
{
    public class ComplexTestAnswersDto
    {
        public Guid LessonId { get; set; }

        public List<TestAnswerDto> Answers { get; set; } 
    }
}
