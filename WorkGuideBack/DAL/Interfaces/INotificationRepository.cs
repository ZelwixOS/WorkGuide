using DAL.Entities;

namespace DAL.Interfaces
{
    public interface INotificationRepository : IRepository<Notification, Guid>
    {
    }
}
