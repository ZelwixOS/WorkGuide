using BLL.Interfaces;

namespace BLL.DTO.Request.Theory
{
    public abstract class TheoryRequestDto : IDtoMapper<DAL.Entities.Theory>
    {
        public int PageNumer { get; set; }

        public string Content { get; set; }

        public Guid LessonId { get; set; }

        public abstract DAL.Entities.Theory ToModel();
    }
}
