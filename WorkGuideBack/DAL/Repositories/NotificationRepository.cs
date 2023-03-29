using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class NotificationRepository : BaseRepository, INotificationRepository
    {
        public NotificationRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Notification CreateItem(Notification notification)
        {
            var entity = this.Context.Add(notification);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Notification> GetItems()
        {
            return this.Context.Notifications.AsNoTracking();
        }

        public Notification GetItem(Guid id)
        {
            var position = this.Context.Notifications
                .FirstOrDefault(c => c.Id == id);

            return position;
        }

        public int DeleteItem(Notification notification)
        {
            this.Context.Notifications.Remove(notification);
            return this.Context.SaveChanges();
        }

        public Notification UpdateItem(Notification notification)
        {
            var entity = this.Context.Notifications.Update(notification);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
