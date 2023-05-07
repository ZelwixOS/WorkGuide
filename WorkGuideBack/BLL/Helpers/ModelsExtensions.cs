using BLL.Models.Achievements;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Helpers
{
    public static class ModelsExtensions
    {
        public static AchievementModel ToModel(this Achievement achievement)
        {
            AchievementModel result;
            switch (achievement.Type)
            {
                case AchievementType.CompletedTests:
                    result = new CompletedTestsAchievement(achievement);
                    break;
                case AchievementType.CompletedCourse:
                    result = new CompletedCourseAchievement(achievement);
                    break;
                case AchievementType.CompletedCourses:
                    result = new CompletedCoursesAchievement(achievement);
                    break;
                default:
                    result = new AchievementModel(achievement);
                    break;
            }

            return result;
        }
    }
}
