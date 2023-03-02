namespace BLL.DTO.Response
{
    public class TestResultDto
    {
        public TestResultDto(int correctAnswers, int totalAnswers)
        {
            CorrectAnswers = correctAnswers;
            TotalAnswers = totalAnswers;
        }

        public int CorrectAnswers { get; set; }

        public int TotalAnswers { get; set; }
    }
}
