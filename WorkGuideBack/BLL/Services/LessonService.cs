using BLL.DTO.Request.Course;
using BLL.DTO.Request.Lesson;
using BLL.DTO.Response;
using BLL.Helpers;
using BLL.Interfaces;
using DAL.Entities;
using DAL.Interfaces;

namespace BLL.Services
{
    public class LessonService : ILessonService
    {
        private ILessonRepository _lessonRepository;

        public LessonService(ICourseRepository categoryRepository)
        {
            _lessonRepository = _lessonRepository;
        }

        public PaginatedData<LessonDto> GetLessons(int page, int itemsOnPage, string search)
        {
            if (search == "\"\"")
            {
                search = null;
            }

            var lessons = _lessonRepository
            .GetItems()
                .Where(s => string.IsNullOrEmpty(search) || s.Name.Contains(search));

            var result = Paginator<Lesson>.ElementsOfPage(lessons, page, itemsOnPage);
            return new PaginatedData<LessonDto>(result.Data.Select(s => new LessonDto(s)).ToList(), result.CurrentPage, result.MaxPage);
        }

        public LessonDto GetLesson(Guid id)
        {
            var lesson = _lessonRepository.GetItem(id);
            if (lesson != null)
            {
                return new LessonDto(lesson);
            }

            return null;
        }

        public LessonDto GetLesson(string url)
        {
            var lesson = _lessonRepository.GetItem(url);
            if (lesson != null)
            {
                return new LessonDto(lesson);
            }

            return null;
        }

        public async Task<LessonDto> CreateLessonAsync(LessonCreateRequestDto lesson)
        {
            var les = lesson.ToModel();
            var res = _lessonRepository.CreateItem(les);

            return new LessonDto(res);
        }

        public LessonDto PublishService(Guid id)
        {
            var lesson = _lessonRepository.GetItem(id);

            if (lesson != null)
            {
                return new LessonDto(_lessonRepository.UpdateItem(lesson));
            }

            return null;
        }

        public LessonDto UnpublishService(Guid id)
        {
            var lesson = this._lessonRepository.GetItem(id);

            if (lesson != null)
            {
                return new LessonDto(_lessonRepository.UpdateItem(lesson));
            }

            return null;
        }

        public async Task<LessonDto> UpdateLessonAsync(LessonUpdateRequestDto lesson)
        {
            var lesEntity = _lessonRepository.GetItem(lesson.Id);

            if (lesEntity == null)
            {
                return null;
            }

            var les = lesson.ToModel();

            lesEntity = null;
            var lessonEntity = _lessonRepository.UpdateItem(les);

            return new LessonDto(lessonEntity);
        }

        public int DeleteLesson(Guid id)
        {
            var lesson = _lessonRepository.GetItem(id);
            if (lesson != null)
            {
                return _lessonRepository.DeleteItem(lesson);
            }
            else
            {
                return 0;
            }
        }
    }
}
