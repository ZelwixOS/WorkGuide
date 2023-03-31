using DAL.EF;
using DAL.Interfaces;

namespace DAL.Repository
{
    public abstract class BaseRepository
    {
        private bool disposed = false;

        public BaseRepository(string connectionString, IDatabaseContextFactory contextFactory)
        {
            this.ConnectionString = connectionString;
            this.ContextFactory = contextFactory;
            this.Context = this.ContextFactory.CreateDbContext(this.ConnectionString);
        }

        public BaseRepository(DatabaseContext context) => this.Context = context;

        protected string ConnectionString { get; }

        protected IDatabaseContextFactory ContextFactory { get; }

        protected DatabaseContext Context { get; set; }

        public void Dispose()
        {
            this.Dispose(true);

            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    this.Context.Dispose();
                }

                this.disposed = true;
            }
        }
    }
}
