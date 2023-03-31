using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class UserLessonScoreRepository : BaseRepository, IUserLessonScoreRepository
    {
        public UserLessonScoreRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }
        public UserLessonScore CreateItem(UserLessonScore userLessonScore)
        {
            var entity = this.Context.Add(userLessonScore);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<UserLessonScore> GetItems()
        {
            return this.Context.UserLessonScores.AsNoTracking();
        }

        public UserLessonScore GetItem(Guid id)
        {
            var userLessonScore = this.Context.UserLessonScores
                .FirstOrDefault(c => c.Id == id);

            return userLessonScore;
        }

        public int DeleteItem(UserLessonScore userLessonScore)
        {
            this.Context.UserLessonScores.Remove(userLessonScore);
            return this.Context.SaveChanges();
        }

        public UserLessonScore UpdateItem(UserLessonScore userLessonScore)
        {
            var entity = this.Context.UserLessonScores.Update(userLessonScore);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
