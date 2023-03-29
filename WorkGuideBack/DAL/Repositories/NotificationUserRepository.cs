using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class NotificationUserRepository : BaseRepository, INotificationUserRepository
    {
        public NotificationUserRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public NotificationUser CreateItem(NotificationUser notification)
        {
            var entity = this.Context.Add(notification);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<NotificationUser> GetItems()
        {
            return this.Context.NotificationUsers.AsNoTracking();
        }

        public NotificationUser GetItem(Guid id)
        {
            var position = this.Context.NotificationUsers
                .Include(c => c.Notification)
                .FirstOrDefault(c => c.Id == id);

            return position;
        }

        public int DeleteItem(NotificationUser notification)
        {
            this.Context.NotificationUsers.Remove(notification);
            return this.Context.SaveChanges();
        }

        public NotificationUser UpdateItem(NotificationUser notification)
        {
            var entity = this.Context.NotificationUsers.Update(notification);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
