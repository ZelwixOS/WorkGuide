using BLL.Helpers;
using BLL.Interfaces;
using BLL.Models.Achievements;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using System.Xml;
using System.Xml.Linq;

namespace BLL.DTO.Request.Achievement
{
    public abstract class AchievementRequestDto : IDtoMapper<DAL.Entities.Achievement>
    {
        public string Name { get; set; }

        public IFormFile? PicFile { get; set; }

        public string Description { get; set; }

        public AchievementType Type { get; set; }

        public Guid? CourseId { get; set; }

        public int? Count { get; set; }

        public TestScore TestScore { get; set; }

        public abstract DAL.Entities.Achievement ToModel();

        protected string GetParameters()
        {
            object?[] parameters;

            switch (Type)
            {
                case AchievementType.CompletedCourses:
                    parameters = new XElement[2];
                    parameters[0] = new XElement(Constants.Achievements.TestScore, ((int)this.TestScore).ToString());
                    parameters[1] = new XElement(Constants.Achievements.CoursesCount, this.Count.ToString());
                    break;
                case AchievementType.CompletedCourse:
                    parameters = new XElement[1];
                    parameters[0] = new XElement(Constants.Achievements.TestScore, ((int)this.TestScore).ToString());
                    break;
                case AchievementType.CompletedTests:
                    parameters = new XElement[2];
                    parameters[0] = new XElement(Constants.Achievements.TestScore, ((int)this.TestScore).ToString());
                    parameters[1] = new XElement(Constants.Achievements.TestsCount, this.Count.ToString());
                    break;
                default:
                    parameters = null;
                    break;
            }

            return new XDocument(new XElement(Constants.Achievements.Parameters, parameters)).ToString();
        }
    }
}
