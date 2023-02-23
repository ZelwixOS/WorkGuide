using DAL.EF;

namespace DAL.Interfaces
{
    public interface IDatabaseContextFactory
    {
        public DatabaseContext CreateDbContext(string connectionString);
    }
}
