using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO.Response
{
    public class TheoryDto
    {
        public TheoryDto(Theory theory)
        {
            this.Id = theory.Id;
            this.PageNumer = theory.PageNumer;

            if (theory.Lesson != null)
            {
                this.LessonName = theory.Lesson.Name;
                this.LessonNumber = theory.Lesson.OrderNumber;

                if (theory.Lesson.Course != null)
                {
                    this.CourseUrl = theory.Lesson.Course.Url;
                }
            }
        }

        public Guid Id { get; set; }

        public int PageNumer { get; set; }

        public string Content { get; set; }

        public string LessonName { get; set; }

        public string CourseUrl { get; set; }

        public int LessonNumber { get; set; }
    }
}
