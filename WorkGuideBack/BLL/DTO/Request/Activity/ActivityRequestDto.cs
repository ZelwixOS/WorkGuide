using BLL.Interfaces;

namespace BLL.DTO.Request.Activity
{
    public abstract class ActivityRequestDto : IDtoMapper<DAL.Entities.Activity>
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public string AdditContent { get; set; }

        public DateTime DateOfCreation { get; set; }

        public Guid UserId { get; set; }

        public abstract DAL.Entities.Activity ToModel();
    }
}
