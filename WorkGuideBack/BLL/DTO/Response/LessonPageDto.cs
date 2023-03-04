using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO.Response
{
    public class LessonPageDto
    {
        public Guid Id { get; set; }

        public int PageNumber { get; set; }

        public string Content { get; set; }

        public string LessonName { get; set; }

        public string CourseUrl { get; set; }

        public int LessonNumber { get; set; }
    }
}
