using BLL.DTO.Request.Course;
using BLL.DTO.Response;
using DAL.Entities;

namespace BLL.Interfaces
{
    public interface ICourseService
    {
        Task<CourseDto> CreateCourseAsync(CourseCreateRequestDto course);
        int DeleteCourse(Guid id);
        CourseDto GetCourse(Guid id);
        CourseDto GetCourse(string url);
        CourseDto PublishService(Guid id);
        CourseDto UnpublishService(Guid id);
        PaginatedData<CourseDto> GetCourses(int page, int itemsOnPage, string search, bool published, User user);
        Task<CourseDto> UpdateCourseAsync(CourseUpdateRequestDto course);
        CourseDto AddPosition(Guid id, Guid positionId);
        bool DeletePosition(Guid id, Guid positionId);
    }
}