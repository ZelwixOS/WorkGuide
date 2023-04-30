using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class TheoryFileRepository : BaseRepository, ITheoryFileRepository
    {
        public TheoryFileRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public TheoryFile CreateItem(TheoryFile theoryFile)
        {
            var entity = this.Context.Add(theoryFile);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<TheoryFile> GetItems()
        {
            return this.Context.TheoryFiles.Include(c => c.Theory).AsNoTracking();
        }

        public TheoryFile GetItem(Guid id)
        {
            var theoryFile = this.Context.TheoryFiles
                .Include(c => c.Theory)
                .FirstOrDefault(c => c.Id == id);

            return theoryFile;
        }

        public int DeleteItem(TheoryFile theoryFile)
        {
            this.Context.TheoryFiles.Remove(theoryFile);
            return this.Context.SaveChanges();
        }

        public TheoryFile UpdateItem(TheoryFile theoryFile)
        {
            var entity = this.Context.TheoryFiles.Update(theoryFile);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
