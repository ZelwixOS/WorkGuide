using DAL.Entities;

namespace BLL.DTO.Response
{
    public class LessonDto
    {
        public LessonDto(Lesson lesson)
        {
            this.Id = lesson.Id;
            this.Name = lesson.Name;
            this.OrderNumber = lesson.OrderNumber;
            
            if (lesson.Course != null)
            {
                this.CourseUrl = lesson.Course.Url;
                this.CourseName = lesson.Course.Name;
            }

            if (lesson.TheoryPages != null)
            {
                this.TheoryPages = lesson.TheoryPages.Select(t => new TheoryDto(t)).ToList();
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public int OrderNumber { get; set; }

        public string CourseUrl { get; set; }

        public string CourseName { get; set; }

        public List<TheoryDto> TheoryPages { get; set; }
    }
}
