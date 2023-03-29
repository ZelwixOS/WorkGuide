using BLL.DTO.Request.Notification;
using BLL.DTO.Request.Position;
using BLL.DTO.Response;
using BLL.Interfaces;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BLL.Services
{
    public class NotificationService : INotificationService
    {
        private INotificationRepository notificationRepository;
        private INotificationUserRepository notificationUserRepository;
        private IUserRepository userRepository;

        public NotificationService(INotificationRepository notificationRepository, 
            INotificationUserRepository notificationUserRepository, 
            IUserRepository userRepository)
        {
            this.notificationRepository = notificationRepository;
            this.notificationUserRepository = notificationUserRepository;
            this.userRepository = userRepository;
        }

        public List<NotificationDto> GetAllNotifications()
        {
            var notifications = this.notificationRepository.GetItems();
            return notifications?.Select(i => new NotificationDto(i))?.ToList();
        }

        public NotificationDto GetNotification(Guid id)
        {
            var notification = this.notificationRepository.GetItem(id);
            if (notification != null)
            {
                return new NotificationDto(notification);
            }

            return null;
        }

        public List<NotificationUserDto> GetAllNotificationsUser(Guid userId)
        {
            var notificationUser = notificationUserRepository.GetItems().Include(i => i.Notification)
                .Where(i => i.UserId == userId && !i.Read)?.ToList();
            return notificationUser.Select(i => new NotificationUserDto(i))?.ToList();
        }

        public NotificationDto CreateNotificationUser(NotificationCreateRequestDto notification, Guid userid)
        {
            var user = this.userRepository.GetItem(userid);
            if (user == null)
            {
                return null;
            }

            var notificationMod = notification.ToModel();
            var notificationCreate = this.notificationRepository.CreateItem(notificationMod);

            this.notificationUserRepository.CreateItem(
                new NotificationUser()
                {
                    UserId = userid,
                    Read = false,
                    NotificationId = notificationMod.Id
                });

            return new NotificationDto(notificationCreate);
        }

        public NotificationDto CreateNotificationPosition(NotificationCreateRequestDto notification, Guid positionId)
        {
            var users = this.userRepository.GetItems()
                .Where(i => i.Position.Id == positionId)?.ToList();
            if (users == null)
            {
                return null;
            }

            var notificationMod = notification.ToModel();
            var notificationCreate = this.notificationRepository.CreateItem(notificationMod);

            foreach (var i in users)
            {
                this.notificationUserRepository.CreateItem(
                    new NotificationUser()
                    {
                        UserId = i.Id,
                        Read = false,
                        NotificationId = notificationMod.Id
                    });
            }

            return new NotificationDto(notificationCreate);
        }

        public NotificationDto UpdateNotification(NotificationUpdateRequestDto notification)
        {
            var notif = this.userRepository.GetItem(notification.Id);
            if (notif == null)
            {
                return null;
            }

            var notificationMod = notification.ToModel();
            var notificationEntity = this.notificationRepository.UpdateItem(notificationMod);

            return new NotificationDto(notificationEntity);
        }

        public int DeleteNotification(Guid id)
        {
            var notification = this.notificationRepository.GetItem(id);
            if (notification != null)
            {
                var notificationUsers = notificationUserRepository.GetItems()
                    .Where(i => i.NotificationId == id)?.ToList();
                if (notificationUsers != null)
                {
                    foreach (var notificationUser in notificationUsers)
                    {
                        this.notificationUserRepository.DeleteItem(notificationUser);
                    }
                }
                return this.notificationRepository.DeleteItem(notification);
            }
            else
            {
                return 0;
            }
        }

        public NotificationUserDto ReadNotification(Guid id, Guid userId)
        {
            var notificationUser = this.notificationUserRepository.GetItems().Include(x => x.Notification)
                .FirstOrDefault(i => i.Id == id && i.UserId == userId);
            if (notificationUser == null)
            {
                return null;
            }

            notificationUser.Read = true;
            var notification = this.notificationUserRepository.UpdateItem(notificationUser);
            return new NotificationUserDto(notification);
        }

        public NotificationUserDto ReadNotNotification(Guid id, Guid userId)
        {
            var notificationUser = this.notificationUserRepository.GetItems().Include(x => x.Notification)
                .FirstOrDefault(i => i.Id == id && i.UserId == userId);
            if (notificationUser == null)
            {
                return null;
            }

            notificationUser.Read = false;
            var notification = this.notificationUserRepository.UpdateItem(notificationUser);
            return new NotificationUserDto(notification);
        }
    }
}
