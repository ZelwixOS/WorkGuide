using BLL.Interfaces;

namespace BLL.DTO.Request.Lesson
{
    public abstract class LessonRequestDto : IDtoMapper<DAL.Entities.Lesson>
    {
        public int OrderNumber { get; set; }
        
        public string Name { get; set; }

        public Guid CourseId { get; set; }

        public abstract DAL.Entities.Lesson ToModel();
    }
}
