using BLL.Helpers;
using DAL.Entities;
using System.Xml.Linq;

namespace BLL.Models.Achievements
{
    public class CompletedCoursesAchievement : AchievementModel
    {
        public CompletedCoursesAchievement(Achievement achievement) : base(achievement)
        {
            var parameters = XDocument.Parse(achievement.Parameters).Elements();
            if (int.TryParse(parameters.FirstOrDefault(d => d.Name == Constants.Achievements.TestScore)?.Value, out int ts))
            {
                this.TestScore = (TestScore)ts;
            }

            if (int.TryParse(parameters.FirstOrDefault(d => d.Name == Constants.Achievements.CoursesCount)?.Value, out int cc))
            {
                this.CoursesCount = cc;
            }
        }

        public TestScore TestScore { get; set; }

        public int CoursesCount { get; set; }
    }
}
