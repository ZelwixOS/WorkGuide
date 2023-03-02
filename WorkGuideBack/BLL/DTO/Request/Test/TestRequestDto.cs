using BLL.Interfaces;

namespace BLL.DTO.Request.Test
{
    public abstract class TestRequestDto : IDtoMapper<DAL.Entities.Test>
    {
        public int PageNumer { get; set; }

        public string Content { get; set; }

        public Guid LessonId { get; set; }

        public abstract DAL.Entities.Test ToModel();
    }
}
