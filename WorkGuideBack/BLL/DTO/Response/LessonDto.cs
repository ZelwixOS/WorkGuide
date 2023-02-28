using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO.Response
{
    public class LessonDto
    {
        public LessonDto(Lesson course)
        {
            this.Id = course.Id;
            this.Name = course.Name;
            this.Url = course.Url;
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }
    }
}
