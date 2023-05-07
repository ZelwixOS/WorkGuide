using BLL.Models.Achievements;
using DAL.Entities;

namespace BLL.DTO.Response
{
    public class AchievementDto : ICloneable
    {
        public AchievementDto()
        {
        }

        public AchievementDto(Achievement achievement)
        {
            this.Id = achievement.Id;
            this.Name = achievement.Name;
            this.Description = achievement.Description;
            this.IconUrl = achievement.IconUrl;
            
            if (achievement.Course != null )
            {
                this.CourseName = achievement.Course.Name;
                this.CourseUrl = achievement.Course.Url;
            }
        }

        public AchievementDto(Achievement achievement, bool isCompleted, DateTime? recievingData)
            : this(achievement)
        {
            this.IsCompleted = isCompleted;
            this.RecievingDate = recievingData;
        }

        public AchievementDto(AchievementModel achievementModel, bool isCompleted = false, DateTime? recievingDate = null)
        {
            this.Id = achievementModel.Id;
            this.Name = achievementModel.Name;
            this.Description = achievementModel.Description;

            if ( achievementModel.Course != null )
            {
                this.CourseName = achievementModel.Course.Name;
                this.CourseUrl = achievementModel.Course.Url;
            }

            this.IsCompleted = isCompleted;
            this.RecievingDate = recievingDate;
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string IconUrl { get; set; }

        public string Description { get; set; }

        public string CourseName { get; set; }

        public string CourseUrl { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime? RecievingDate { get; set; }

        public object Clone()
        {
            return new AchievementDto()
            {
                Id = this.Id,
                Name = this.Name,
                IconUrl = this.IconUrl,
                Description = this.Description,
                CourseName = this.CourseName,
                CourseUrl = this.CourseUrl,
                IsCompleted = this.IsCompleted,
                RecievingDate = this.RecievingDate,
            };
        }
    }
}
