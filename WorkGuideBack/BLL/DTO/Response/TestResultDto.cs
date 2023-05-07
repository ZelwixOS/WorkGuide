namespace BLL.DTO.Response
{
    public class TestResultDto
    {
        public TestResultDto(int correctAnswers, int totalAnswers)
        {
            CorrectAnswers = correctAnswers;
            TotalAnswers = totalAnswers;
            Achievements = new List<AchievementDto>();
        }

        public TestResultDto(int correctAnswers, int totalAnswers, List<AchievementDto> achievements)
        {
            CorrectAnswers = correctAnswers;
            TotalAnswers = totalAnswers;
            Achievements = achievements;
        }

        public int CorrectAnswers { get; set; }

        public int TotalAnswers { get; set; }

        public List<AchievementDto> Achievements { get; set; }
    }
}
