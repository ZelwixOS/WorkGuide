using DAL.Entities;

namespace BLL.DTO.Response
{
    public class NotificationUserDto
    {
        public NotificationUserDto(NotificationUser notification)
        {
            this.Id = notification.Id;

            this.Title = notification.Notification.Title;

            this.DateOfCreation = notification.Notification.DateOfCreation;

            this.Read = notification.Read;
        }

        public DateTime DateOfCreation { get; set; }

        public string Title { get; set; }

        public Guid Id { get; set; }

        public bool Read { get; set; }
    }
}
