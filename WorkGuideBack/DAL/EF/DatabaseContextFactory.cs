using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.EF
{
    public class DatabaseContextFactory : IDatabaseContextFactory
    {
        public DatabaseContext CreateDbContext(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new DatabaseContext(optionsBuilder.Options);
        }
    }
}
