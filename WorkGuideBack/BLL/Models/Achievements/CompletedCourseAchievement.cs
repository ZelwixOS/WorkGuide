using BLL.Helpers;
using DAL.Entities;
using System.Xml.Linq;

namespace BLL.Models.Achievements
{
    public class CompletedCourseAchievement : AchievementModel
    {
        public CompletedCourseAchievement(Achievement achievement) : base(achievement)
        {
            var parameters = XDocument.Parse(achievement.Parameters).Elements().FirstOrDefault()?.Elements();
            if (int.TryParse(parameters.FirstOrDefault(d => d.Name == Constants.Achievements.TestScore)?.Value, out int ts))
            {
                this.TestScore = (TestScore)ts;
            }
        }

        public TestScore TestScore { get; set; }
    }
}
