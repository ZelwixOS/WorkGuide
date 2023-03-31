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

            if (course.Lessons != null)
            {
                Lessons = course.Lessons.Select(l => new LessonDto(l)).ToList();
            }
        }

        public CourseDto(Course course, UserCourse userCourse)
            : this(course)
        {
            if (userCourse != null)
            {
                this.CompletedTests = userCourse.CompletedTests;
                this.TotalTests = userCourse.TotalTests;
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public bool Published { get; set; }

        public string PicUrl { get; set; }

        public string Description { get; set; }

        public List<LessonDto> Lessons { get; set; }

        public int CompletedTests { get; set; }

        public int TotalTests { get; set; }
    }
}
