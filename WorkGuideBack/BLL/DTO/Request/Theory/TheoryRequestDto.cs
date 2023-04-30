using BLL.Interfaces;
using Microsoft.AspNetCore.Http;

namespace BLL.DTO.Request.Theory
{
    public abstract class TheoryRequestDto : IDtoMapper<DAL.Entities.Theory>
    {
        public int PageNumber { get; set; }

        public string Content { get; set; }

        public Guid LessonId { get; set; }

        public abstract DAL.Entities.Theory ToModel();
    }
}
