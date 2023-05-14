using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class UserAchievementRepository : BaseRepository, IUserAchievementRepository
    {
        public UserAchievementRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public UserAchievement CreateItem(UserAchievement item)
        {
            var entity = this.Context.Add(item);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public int DeleteItem(UserAchievement item)
        {
            this.Context.UserAchievements.Remove(item);
            return this.Context.SaveChanges();
        }

        public UserAchievement GetItem(Guid id)
        {
            var item = this.Context.UserAchievements.AsNoTracking().FirstOrDefault(c => c.Id == id);
            return item;
        }

        public IQueryable<UserAchievement> GetItems()
        {
            return this.Context.UserAchievements
                .Include(ua => ua.Achievement).ThenInclude(ua => ua.Course)
                .AsNoTracking();
        }

        public UserAchievement UpdateItem(UserAchievement item)
        {
            var entity = this.Context.UserAchievements.Update(item);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
