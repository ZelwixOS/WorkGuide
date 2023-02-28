using BLL.DTO.Request.Lesson;
using BLL.DTO.Response;

namespace BLL.Interfaces
{
    public interface ILessonService
    {
        Task<LessonDto> CreateLessonAsync(LessonCreateRequestDto lesson);
        int DeleteLesson(Guid id);
        LessonDto GetLesson(Guid id);
        LessonDto GetLesson(string url);
        PaginatedData<LessonDto> GetLessons(int page, int itemsOnPage, string search);
        LessonDto PublishService(Guid id);
        LessonDto UnpublishService(Guid id);
        Task<LessonDto> UpdateLessonAsync(LessonUpdateRequestDto lesson);

    }
}
