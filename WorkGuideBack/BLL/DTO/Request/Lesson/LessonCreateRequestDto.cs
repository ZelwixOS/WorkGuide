namespace BLL.DTO.Request.Lesson
{
    public class LessonCreateRequestDto : LessonRequestDto
    {
        public override DAL.Entities.Lesson ToModel()
        {
            return new DAL.Entities.Lesson()
            {
                Name = this.Name,
                Url = this.Url,
            };
        }
    }
}
