using DAL.Entities;

namespace DAL.Interfaces
{
    public interface ICourseRepository
        : IRepository<Course, Guid>
    {
        Course GetItem(string url);
    }
}
