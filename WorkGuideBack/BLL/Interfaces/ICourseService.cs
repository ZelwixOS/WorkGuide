using BLL.DTO.Request.Course;
using BLL.DTO.Response;

namespace BLL.Interfaces
{
    public interface ICourseService
    {
        Task<CourseDto> CreateCourseAsync(CourseCreateRequestDto course);
        int DeleteCourse(Guid id);
        CourseDto GetCourse(Guid id);
        CourseDto GetCourse(string url);
        PaginatedData<CourseDto> GetCourses(int page, int itemsOnPage, string search, bool published);
        CourseDto PublishService(Guid id);
        CourseDto UnpublishService(Guid id);
        Task<CourseDto> UpdateCourseAsync(CourseUpdateRequestDto course);
        CourseDto AddPosition(Guid id, Guid positionId);
        bool DeletePosition(Guid id, Guid positionId);
    }
}