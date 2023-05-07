namespace BLL.DTO.Request.Achievement
{
    public class AchievementUpdateRequestDto : AchievementRequestDto
    {
        public Guid Id { get; set; }

        public override DAL.Entities.Achievement ToModel()
        {
            return new DAL.Entities.Achievement()
            {
                Id = Id,
                Name = this.Name,
                Description = this.Description,
                Type = this.Type,
                CourseId = this.CourseId,
                Parameters = this.GetParameters()
            };
        }
    }
}
