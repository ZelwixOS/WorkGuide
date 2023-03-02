using DAL.Entities;

namespace DAL.Interfaces
{
    public interface ITestRepository : IRepository<Test, Guid>
    {
    }
}
