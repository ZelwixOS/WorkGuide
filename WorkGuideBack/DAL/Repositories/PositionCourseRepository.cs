using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class PositionCourseRepository : BaseRepository, IPositionCourseRepository
    {
        public PositionCourseRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public PositionCourse CreateItem(PositionCourse positionCourse)
        {
            var entity = this.Context.Add(positionCourse);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<PositionCourse> GetItems()
        {
            return this.Context.PositionCourses.AsNoTracking();
        }

        public PositionCourse GetItem(Guid id)
        {
            var positionCource = this.Context.PositionCourses
                .FirstOrDefault(c => c.Id == id);

            return positionCource;
        }

        public int DeleteItem(PositionCourse positionCourse)
        {
            this.Context.PositionCourses.Remove(positionCourse);
            return this.Context.SaveChanges();
        }

        public PositionCourse UpdateItem(PositionCourse positionCourse)
        {
            var entity = this.Context.PositionCourses.Update(positionCourse);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
