using DAL.Entities;

namespace DAL.Interfaces
{
    public interface IAchievementRepository
        : IRepository<Achievement, Guid>
    {
    }
}
