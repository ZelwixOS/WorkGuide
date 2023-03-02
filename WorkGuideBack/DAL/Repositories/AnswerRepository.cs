using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class AnswerRepository : BaseRepository, IAnswerRepository
    {
        public AnswerRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Answer CreateItem(Answer answer)
        {
            var entity = this.Context.Add(answer);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Answer> GetItems()
        {
            return this.Context.Question.AsNoTracking();
        }

        public Answer GetItem(Guid id)
        {
            var question = this.Context.Question
                .FirstOrDefault(c => c.Id == id);

            return question;
        }

        public int DeleteItem(Answer answer)
        {
            this.Context.Question.Remove(answer);
            return this.Context.SaveChanges();
        }

        public Answer UpdateItem(Answer answer)
        {
            var entity = this.Context.Question.Update(answer);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
