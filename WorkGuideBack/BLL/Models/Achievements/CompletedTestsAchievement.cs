using BLL.Helpers;
using DAL.Entities;
using System.Xml.Linq;

namespace BLL.Models.Achievements
{
    public class CompletedTestsAchievement : AchievementModel
    {
        public CompletedTestsAchievement(Achievement achievement) : base(achievement)
        {
            var parameters = XDocument.Parse(achievement.Parameters).Elements();
            if (int.TryParse(parameters.FirstOrDefault(d => d.Name == Constants.Achievements.TestScore)?.Value, out int ts))
            {
                this.TestScore = (TestScore)ts;
            }

            if (int.TryParse(parameters.FirstOrDefault(d => d.Name == Constants.Achievements.CoursesCount)?.Value, out int tc))
            {
                this.TestsCount = tc;
            }
        }

        public int TestsCount { get; set; }

        public TestScore TestScore { get; set; }
    }
}
