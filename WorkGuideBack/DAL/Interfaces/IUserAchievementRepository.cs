using DAL.Entities;

namespace DAL.Interfaces
{
    public interface IUserAchievementRepository
        : IRepository<UserAchievement, Guid>
    {
    }
}
