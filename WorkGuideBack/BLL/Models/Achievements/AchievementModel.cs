using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models.Achievements
{
    public class AchievementModel
    {
        public AchievementModel(Achievement achievement)
        {
            this.Id = achievement.Id;
            this.Name = achievement.Name;
            this.Description = achievement.Description;
            this.Type = achievement.Type;
            this.CourseId = achievement.CourseId;
            this.Course =  achievement.Course;
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string IconUrl { get; set; }

        public string Description { get; set; }

        public AchievementType Type { get; set; }

        public Guid? CourseId { get; set; }

        public Course Course { get; set; }
    }
}
