namespace BLL.DTO.Request.Achievement
{
    public class AchievementCreateRequestDto : AchievementRequestDto
    {
        public override DAL.Entities.Achievement ToModel()
        {
            return new DAL.Entities.Achievement()
            {
                Name = this.Name,
                Description = this.Description,
                Type = this.Type,
                CourseId = this.CourseId,
                Parameters = this.GetParameters()
            };
        }
    }
}
