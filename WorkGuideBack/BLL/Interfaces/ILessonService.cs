using BLL.DTO.Request.Lesson;
using BLL.DTO.Response;

namespace BLL.Interfaces
{
    public interface ILessonService
    {
        LessonDto CreateLesson(LessonCreateRequestDto lesson);
        int DeleteLesson(Guid id);
        LessonDto GetLesson(Guid id);
        LessonDto GetLesson(string courseUrl, int number);
        LessonDto UpdateLesson(LessonUpdateRequestDto lesson);

    }
}
