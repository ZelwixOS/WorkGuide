using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class AchievementRepository : BaseRepository, IAchievementRepository
    {
        public AchievementRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Achievement CreateItem(Achievement item)
        {
            var entity = this.Context.Add(item);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public int DeleteItem(Achievement item)
        {
            this.Context.Achievements.Remove(item);
            return this.Context.SaveChanges();
        }

        public Achievement GetItem(Guid id)
        {
            var item = this.Context.Achievements.FirstOrDefault(c => c.Id == id);
            return item;
        }

        public IQueryable<Achievement> GetItems()
        {
            return this.Context.Achievements.Include(a => a.Course).AsNoTracking();
        }

        public Achievement UpdateItem(Achievement item)
        {
            var entity = this.Context.Achievements.Update(item);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
