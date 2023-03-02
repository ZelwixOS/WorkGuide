namespace BLL.DTO.Request.Lesson
{
    public class LessonUpdateRequestDto : LessonRequestDto
    {
        public Guid Id { get; set; }

        public override DAL.Entities.Lesson ToModel()
        {
            return new DAL.Entities.Lesson()
            {
                Id = this.Id,
                Name = this.Name,
                OrderNumber = this.OrderNumber,
                CourseId = this.CourseId
            };
        }
    }
}
