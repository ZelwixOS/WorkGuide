using BLL.Interfaces;
using Microsoft.AspNetCore.Http;

namespace BLL.DTO.Request.Course
{
    public abstract class CourseRequestDto : IDtoMapper<DAL.Entities.Course>
    {
        public string Url { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public IFormFile? PicFile { get; set; }

        public abstract DAL.Entities.Course ToModel();
    }
}
