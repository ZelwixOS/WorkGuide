using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class LessonRepository : BaseRepository, ILessonRepository
    {
        public LessonRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Lesson CreateItem(Lesson lesson)
        {
            var entity = this.Context.Add(lesson);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Lesson> GetItems()
        {
            return this.Context.Lessons.AsNoTracking();
        }

        public Lesson GetItem(Guid id)
        {
            var lessons = this.Context.Lessons
                .FirstOrDefault(c => c.Id == id);

            return lessons;
        }

        public int DeleteItem(Lesson lesson)
        {
            this.Context.Lessons.Remove(lesson);
            return this.Context.SaveChanges();
        }

        public Lesson UpdateItem(Lesson lesson)
        {
            var entity = this.Context.Lessons.Update(lesson);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
