using BLL.DTO.Request.Lesson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.DTO.Request.Answer;

namespace BLL.DTO.Request.Test
{
    public class TestCreateRequestDto : TestRequestDto
    {
        public override DAL.Entities.Test ToModel()
        {
            return new DAL.Entities.Test()
            {
                Content = this.Content,
                PageNumer = this.PageNumer,
                LessonId = this.LessonId,
                IsManyAnswer = this.IsManyAnswer
            };
        }
    }
}
