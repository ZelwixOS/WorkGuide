using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class TheoryRepository : BaseRepository, ITheoryRepository
    {
        public TheoryRepository(string connectionString, IDatabaseContextFactory contextFactory) : base(connectionString, contextFactory)
        {
        }

        public Theory CreateItem(Theory theory)
        {
            var entity = this.Context.Add(theory);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Theory> GetItems()
        {
            return this.Context.TheoryPages.AsNoTracking();
        }

        public Theory GetItem(Guid id)
        {
            var theory = this.Context.TheoryPages.Include(t => t.TheoryFiles).AsNoTracking()
                .FirstOrDefault(c => c.Id == id);

            return theory;
        }

        public int DeleteItem(Theory theory)
        {
            this.Context.TheoryPages.Remove(theory);
            return this.Context.SaveChanges();
        }

        public Theory UpdateItem(Theory theory)
        {
            var entity = this.Context.TheoryPages.Update(theory);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
