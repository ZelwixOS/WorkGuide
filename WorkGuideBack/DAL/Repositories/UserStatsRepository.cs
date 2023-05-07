using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class UserStatsRepository : BaseRepository, IUserStatsRepository
    {
        public UserStatsRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public UserStats CreateItem(UserStats item)
        {
            var entity = this.Context.Add(item);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public int DeleteItem(UserStats item)
        {
            this.Context.UsersStats.Remove(item);
            return this.Context.SaveChanges();
        }

        public UserStats GetItem(Guid id)
        {
            var category = this.Context.UsersStats.FirstOrDefault(c => c.Id == id);
            return category;
        }

        public IQueryable<UserStats> GetItems()
        {
            return this.Context.UsersStats.AsNoTracking();
        }

        public UserStats UpdateItem(UserStats item)
        {
            var entity = this.Context.UsersStats.Update(item);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
