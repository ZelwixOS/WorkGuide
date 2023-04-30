using Microsoft.AspNetCore.Http;

namespace BLL.DTO.Request.Theory
{
    public class TheoryCreateRequestDto : TheoryRequestDto
    {
        public List<IFormFile>? Files { get; set; }

        public override DAL.Entities.Theory ToModel()
        {
            return new DAL.Entities.Theory()
            {
                PageNumer = this.PageNumber,
                Content = this.Content,
                LessonId = this.LessonId,
            };
        }
    }
}
