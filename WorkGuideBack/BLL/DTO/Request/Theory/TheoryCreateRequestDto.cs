namespace BLL.DTO.Request.Theory
{
    public class TheoryCreateRequestDto : TheoryRequestDto
    {
        public override DAL.Entities.Theory ToModel()
        {
            return new DAL.Entities.Theory()
            {
                PageNumer = this.PageNumer,
                Content = this.Content,
                LessonId = this.LessonId,

            };
        }
    }
}
