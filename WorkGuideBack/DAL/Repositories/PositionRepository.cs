using DAL.Entities;
using DAL.Interfaces;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class PositionRepository : BaseRepository, IPositionRepository
    {
        public PositionRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Position CreateItem(Position position)
        {
            var entity = this.Context.Add(position);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Position> GetItems()
        {
            return this.Context.Positions.AsNoTracking();
        }

        public Position GetItem(Guid id)
        {
            var position = this.Context.Positions
                .FirstOrDefault(c => c.Id == id);

            return position;
        }

        public int DeleteItem(Position position)
        {
            this.Context.Positions.Remove(position);
            return this.Context.SaveChanges();
        }

        public Position UpdateItem(Position position)
        {
            var entity = this.Context.Positions.Update(position);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
