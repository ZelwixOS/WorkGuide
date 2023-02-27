using DAL.Entities;

namespace BLL.DTO.Response
{
    public class CourseDto
    {
        public CourseDto(Course course)
        {
            this.Id = course.Id;
            this.Name = course.Name;
            this.Description = course.Description;
            this.Url = course.Url;
            this.PicUrl = course.PicUrl;
            this.Published = course.Published;
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public bool Published { get; set; }

        public string PicUrl { get; set; }

        public string Description { get; set; }
    }
}
