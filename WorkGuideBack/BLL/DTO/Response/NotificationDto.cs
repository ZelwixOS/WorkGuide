using DAL.Entities;

namespace BLL.DTO.Response
{
    public class NotificationDto
    {
        public NotificationDto(Notification notification)
        {
            this.Id = notification.Id;

            this.Title = notification.Title;

            this.DateOfCreation = notification.DateOfCreation;
        }

        public DateTime DateOfCreation { get; set; }

        public string Title { get; set; }

        public Guid Id { get; set; }
    }
}
