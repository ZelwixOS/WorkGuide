using DAL.Entities;

namespace BLL.DTO.Response
{
    public class TestDto : LessonPageDto
    {
        public TestDto(Test test)
        {
            this.Id = test.Id;
            this.PageNumber = test.PageNumer;
            this.Content = test.Content;

            if (test.Answers != null)
            {
                this.Answers = test.Answers.Select(a => new AnswerDto(a)).ToList();
            }

            if (test.Lesson != null)
            {
                this.LessonName = test.Lesson.Name;
                this.LessonNumber = test.Lesson.OrderNumber;

                if (test.Lesson.Course != null)
                {
                    this.CourseUrl = test.Lesson.Course.Url;
                }
            }
        }

        public List<AnswerDto> Answers { get; set; }
    }
}
