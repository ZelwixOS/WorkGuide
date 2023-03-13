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
            this.IsComplexTest = lesson.IsComplexTest;
            
            if (lesson.Course != null)
            {
                this.CourseUrl = lesson.Course.Url;
                this.CourseName = lesson.Course.Name;
            }

            if (lesson.TheoryPages != null)
            {
                this.TheoryPages = lesson.TheoryPages.Select(t => new TheoryDto(t)).ToList();
            }

            if (lesson.TestPages != null)
            {
                this.TestPages = lesson.TestPages.Select(t => new TestDto(t)).ToList();
            }
        }

        public LessonDto(Lesson lesson, Guid userId)
            : this(lesson)
        {
            if (lesson.UsersLessonScores != null)
            {
                lesson.UsersLessonScores.First(i => i.UserId == userId);
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public int OrderNumber { get; set; }

        public string CourseUrl { get; set; }

        public string CourseName { get; set; }

        public bool IsComplexTest { get; set; }

        public bool Finished { get; set; }

        public TestResultDto TestResult { get; set; }

        public List<TheoryDto> TheoryPages { get; set; }

        public List<TestDto> TestPages { get; set; }
    }
}
