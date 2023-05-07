using BLL.Helpers;
using BLL.Interfaces;
using BLL.Models.Achievements;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using System.Xml;

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
            XmlDocument parameters = new XmlDocument();
            XmlElement el;
            switch (Type)
            {
                case AchievementType.CompletedCourses:
                    el = parameters.CreateElement(Constants.Achievements.TestScore);
                    el.InnerText = this.TestScore.ToString();
                    el = parameters.CreateElement(Constants.Achievements.CoursesCount);
                    el.InnerText = this.Count.ToString();
                    break;
                case AchievementType.CompletedCourse:
                    el = parameters.CreateElement(Constants.Achievements.TestScore);
                    el.InnerText = this.TestScore.ToString();
                    break;
                case AchievementType.CompletedTests:
                    el = parameters.CreateElement(Constants.Achievements.TestScore);
                    el.InnerText = this.TestScore.ToString();
                    el = parameters.CreateElement(Constants.Achievements.TestsCount);
                    el.InnerText = this.Count.ToString();
                    break;
            }

            return parameters.OuterXml.ToString();
        }
    }
}
