using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class UserCourseRepository : BaseRepository, IUserCourseRepository
    {
        public UserCourseRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public UserCourse CreateItem(UserCourse userCourse)
        {
            var entity = this.Context.Add(userCourse);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<UserCourse> GetItems()
        {
            return this.Context.UserCourses.AsNoTracking();
        }

        public UserCourse GetItem(Guid id)
        {
            var userCourse = this.Context.UserCourses
                .FirstOrDefault(c => c.Id == id);

            return userCourse;
        }

        public int DeleteItem(UserCourse userCourse)
        {
            this.Context.UserCourses.Remove(userCourse);
            return this.Context.SaveChanges();
        }

        public UserCourse UpdateItem(UserCourse userCourse)
        {
            var entity = this.Context.UserCourses.Update(userCourse);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
