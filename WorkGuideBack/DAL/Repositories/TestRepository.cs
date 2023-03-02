using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace DAL.Repositories
{
    public class TestRepository : BaseRepository, ITestRepository
    {
        public TestRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Test CreateItem(Test test)
        {
            var entity = this.Context.Add(test);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Test> GetItems()
        {
            return this.Context.Tests.AsNoTracking();
        }

        public Test GetItem(Guid id)
        {
            var tests = this.Context.Tests
                .Include(t => t.Answers)
                .FirstOrDefault(c => c.Id == id);

            return tests;
        }

        public int DeleteItem(Test test)
        {
            this.Context.Tests.Remove(test);
            return this.Context.SaveChanges();
        }

        public Test UpdateItem(Test test)
        {
            var entity = this.Context.Tests.Update(test);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
