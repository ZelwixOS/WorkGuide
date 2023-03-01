using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class CourseRepository : BaseRepository, ICourseRepository
    {
        public CourseRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Course CreateItem(Course course)
        {
            var entity = this.Context.Add(course);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Course> GetItems()
        {
            return this.Context.Courses.AsNoTracking();
        }

        public Course GetItem(Guid id)
        {
            var category = this.Context.Courses
                .FirstOrDefault(c => c.Id == id);

            return category;
        }

        public Course GetItem(string url)
        {
            var category = this.Context.Courses
                .Include(c => c.Lessons)
                .AsNoTracking()
                .FirstOrDefault(c => c.Url == url);

            return category;
        }

        public int DeleteItem(Course course)
        {
            this.Context.Courses.Remove(course);
            return this.Context.SaveChanges();
        }

        public Course UpdateItem(Course course)
        {
            var entity = this.Context.Courses.Update(course);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
