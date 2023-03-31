namespace BLL.DTO.Request
{
    public class TestAnswerDto
    {
        public Guid TestId { get; set; }

        public List<Guid> AnswerId { get; set; }
    }
}
