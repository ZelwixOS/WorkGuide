namespace DAL.Repository
{
    using System;
    using System.Linq;
    using DAL.Entities;
    using DAL.Interfaces;
    using Microsoft.EntityFrameworkCore;

    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public IQueryable<User> GetItems()
        {
            return this.Context.Users.AsNoTracking();
        }

        public User GetItem(Guid id)
        {
            return this.Context.Users
                .AsNoTracking()
                .FirstOrDefault(c => c.Id == id);
        }

        public User UpdateUser(User user)
        {
            var entity = this.Context.Users.Update(user);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
