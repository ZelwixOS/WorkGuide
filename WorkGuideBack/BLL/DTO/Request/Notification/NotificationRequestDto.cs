using BLL.Interfaces;

namespace BLL.DTO.Request.Notification
{
    public abstract class NotificationRequestDto : IDtoMapper<DAL.Entities.Notification>
    {
        public string Title { get; set; }

        public DateTime DateOfCreation { get; set; }

        public abstract DAL.Entities.Notification ToModel();
    }
}
