namespace BLL.DTO.Request.Theory
{
    public class TheoryUpdateRequestDto : TheoryRequestDto
    {
        public Guid Id { get; set; }

        public override DAL.Entities.Theory ToModel()
        {
            return new DAL.Entities.Theory()
            {
                Id = this.Id,
                PageNumer = this.PageNumer,
                Content = this.Content,
                LessonId = this.LessonId,

            };
        }
    }
}
