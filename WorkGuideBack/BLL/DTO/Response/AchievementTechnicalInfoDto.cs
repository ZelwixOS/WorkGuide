using BLL.DTO.Request.Achievement;
using BLL.Helpers;
using BLL.Models.Achievements;
using DAL.Entities;

namespace BLL.DTO.Response
{
    public class AchievementTechnicalInfoDto : AchievementUpdateRequestDto
    {
        public string IconUrl { get; set; }

        public AchievementTechnicalInfoDto(Achievement achievement)
        {
            this.Id = achievement.Id;
            this.Name = achievement.Name;
            this.Description = achievement.Description;
            this.IconUrl = achievement.IconUrl;
            this.Type = achievement.Type;
            this.CourseId = achievement.CourseId;

            var mod = achievement.ToModel();

            switch (mod.Type)
            {
                case AchievementType.CompletedCourse:
                    this.TestScore = ((CompletedCourseAchievement)mod).TestScore;
                    break;
                case AchievementType.CompletedCourses:
                    var ccs = (CompletedCoursesAchievement)mod;
                    this.Count = ccs.CoursesCount;
                    this.TestScore = ccs.TestScore;
                    break;
                case AchievementType.CompletedTests:
                    var cts = (CompletedTestsAchievement)mod;
                    this.Count = cts.TestsCount;
                    this.TestScore = cts.TestScore;
                    break; 
            }
            
        }
    }
}
