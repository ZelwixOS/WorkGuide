using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class UserTestAnswerRepository : BaseRepository, IUserTestAnswerRepository
    {
        public UserTestAnswerRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public UserTestAnswer CreateItem(UserTestAnswer userTestAnswer)
        {
            var entity = this.Context.Add(userTestAnswer);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<UserTestAnswer> GetItems()
        {
            return this.Context.UserTestAnswers.AsNoTracking();
        }

        public UserTestAnswer GetItem(Guid id)
        {
            var userTestAnswer = this.Context.UserTestAnswers
                .FirstOrDefault(c => c.Id == id);

            return userTestAnswer;
        }

        public int DeleteItem(UserTestAnswer userTestAnswer)
        {
            this.Context.UserTestAnswers.Remove(userTestAnswer);
            return this.Context.SaveChanges();
        }

        public UserTestAnswer UpdateItem(UserTestAnswer userTestAnswer)
        {
            var entity = this.Context.UserTestAnswers.Update(userTestAnswer);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
