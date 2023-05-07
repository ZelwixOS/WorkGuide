using DAL.Entities;

namespace DAL.Interfaces
{
    public interface IUserStatsRepository
        : IRepository<UserStats, Guid>
    {
    }
}
