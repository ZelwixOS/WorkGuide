using BLL.DTO.Request.Notification;
using BLL.DTO.Response;

namespace BLL.Interfaces
{
    public interface INotificationService
    {
        NotificationDto CreateNotificationUser(NotificationCreateRequestDto notification, Guid userId);
        NotificationDto CreateNotificationPosition(NotificationCreateRequestDto notification, Guid positionId);
        NotificationUserDto ReadNotification(Guid id, Guid userId);
        NotificationUserDto ReadNotNotification(Guid id, Guid userId);
        int DeleteNotification(Guid id);
        List<NotificationDto> GetAllNotifications();
        List<NotificationUserDto> GetAllNotificationsUser(Guid userId);
        NotificationDto GetNotification(Guid id);
        NotificationDto UpdateNotification(NotificationUpdateRequestDto notification);
    }
}
