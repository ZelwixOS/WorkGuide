using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ActivityRepository : BaseRepository, IActivityRepository
    {
        public ActivityRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Activity CreateItem(Activity activity)
        {
            var entity = this.Context.Add(activity);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Activity> GetItems()
        {
            return this.Context.Activitys.AsNoTracking();
        }

        public Activity GetItem(Guid id)
        {
            var activity = this.Context.Activitys
                .FirstOrDefault(c => c.Id == id);

            return activity;
        }

        public int DeleteItem(Activity activity)
        {
            this.Context.Activitys.Remove(activity);
            return this.Context.SaveChanges();
        }

        public Activity UpdateItem(Activity activity)
        {
            var entity = this.Context.Activitys.Update(activity);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
