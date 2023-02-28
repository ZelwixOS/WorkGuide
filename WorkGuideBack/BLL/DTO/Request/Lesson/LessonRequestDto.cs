using BLL.Interfaces;
using Microsoft.AspNetCore.Http;

namespace BLL.DTO.Request.Lesson
{
    public abstract class LessonRequestDto : IDtoMapper<DAL.Entities.Lesson>
    {
        public string Url { get; set; }
        
        public string Name { get; set; }

        public abstract DAL.Entities.Lesson ToModel();
    }
}
