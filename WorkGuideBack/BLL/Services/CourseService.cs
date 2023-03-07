using BLL.DTO.Request.Course;
using BLL.DTO.Response;
using BLL.Helpers;
using BLL.Interfaces;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace BLL.Services
{
    public class CourseService : ICourseService
    {
        private const string PicPath = "ClientApp/coursePics/";

        private ICourseRepository _courseRepository;
        private IPositionRepository positionRepository;
        private IPositionCourseRepository positionCourseRepository;

        public CourseService(ICourseRepository categoryRepository)
        {
            _courseRepository = categoryRepository;
        }

        public PaginatedData<CourseDto> GetCourses(int page, int itemsOnPage, string search, bool published)
        {
            if (search == "\"\"")
            {
                search = null;
            }

            var courses = _courseRepository
            .GetItems()
                .Where(s => !published || s.Published)
                .Where(s => string.IsNullOrEmpty(search) || s.Name.Contains(search));

            var result = Paginator<Course>.ElementsOfPage(courses, page, itemsOnPage);
            return new PaginatedData<CourseDto>(result.Data.Select(s => new CourseDto(s)).ToList(), result.CurrentPage, result.MaxPage);
        }

        public CourseDto GetCourse(Guid id)
        {
            var course = _courseRepository.GetItem(id);
            if (course != null)
            {
                return new CourseDto(course);
            }

            return null;
        }

        public CourseDto GetCourse(string url)
        {
            var course = _courseRepository.GetItem(url);
            if (course != null)
            {
                return new CourseDto(course);
            }

            return null;
        }

        public async Task<CourseDto> CreateCourseAsync(CourseCreateRequestDto course)
        {
            var cour = course.ToModel();

            if (course.PicFile != null)
            {
                var format = course.PicFile.FileName.Substring(course.PicFile.FileName.LastIndexOf('.'));
                cour.PicUrl = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss") + Guid.NewGuid() + format;

                using (var fs = File.Create(PicPath + cour.PicUrl))
                {
                    await course.PicFile.CopyToAsync(fs);
                }
            }
            else
            {
                cour.PicUrl = string.Empty;
            }

            var res = _courseRepository.CreateItem(cour);

            return new CourseDto(res);
        }

        public CourseDto PublishService(string url)
        {
            var course = _courseRepository.GetItem(url);

            if (course != null)
            {
                course.Published = true;
                return new CourseDto(_courseRepository.UpdateItem(course));
            }

            return null;
        }

        public CourseDto UnpublishService(string url)
        {
            var course = this._courseRepository.GetItem(url);

            if (course != null)
            {
                course.Published = false;
                return new CourseDto(_courseRepository.UpdateItem(course));
            }

            return null;
        }

        public async Task<CourseDto> UpdateCourseAsync(CourseUpdateRequestDto course)
        {
            var courEntity = _courseRepository.GetItem(course.Id);

            if (courEntity == null)
            {
                return null;
            }

            var cour = course.ToModel();
            cour.PicUrl = courEntity.PicUrl;

            if (course.PicFile != null)
            {
                var format = course.PicFile.FileName.Substring(course.PicFile.FileName.LastIndexOf('.'));
                cour.PicUrl = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss") + Guid.NewGuid() + format;

                using (var fs = File.Create(PicPath + cour.PicUrl))
                {
                    await course.PicFile.CopyToAsync(fs);
                }

                var file = PicPath + courEntity.PicUrl;
                if (File.Exists(file))
                {
                    File.Delete(file);
                }
            }

            courEntity = null;
            var courseEntity = _courseRepository.UpdateItem(cour);

            return new CourseDto(courseEntity);
        }

        public int DeleteCourse(Guid id)
        {
            var category = _courseRepository.GetItem(id);
            if (category != null)
            {
                return _courseRepository.DeleteItem(category);
            }
            else
            {
                return 0;
            }
        }

        public CourseDto AddPosition(Guid id, Guid positionId)
        {
            var course = this._courseRepository.GetItem(id);
            var position = positionRepository.GetItem(positionId);

            if (course == null || position == null)
            {
                return null;
            }

            PositionCourse positionCourse = positionCourseRepository.GetItems()
                .FirstOrDefault(i => i.CourceId == id && i.PositionId == positionId);

            if (positionCourse != null)
            {
                return new CourseDto(course);
            }

            positionCourse = new PositionCourse() 
            {
                PositionId = positionId, 
                CourceId = id, 
                Position = position, 
                Course = course

            };

            positionCourseRepository.CreateItem(positionCourse);
            course.PositionCources.Add(positionCourse);

            return new CourseDto(course);
        }

        public bool DeletePosition(Guid id, Guid positionId)
        {
            var course = this._courseRepository.GetItem(id);
            var position = positionRepository.GetItem(positionId);

            if (course == null || position == null)
            {
                return false;
            }

            PositionCourse positionCourse = positionCourseRepository.GetItems()
                .FirstOrDefault(i => i.CourceId == id && i.PositionId == positionId);

            if (positionCourse == null)
            {
                return false;
            }

            return course.PositionCources.Remove(positionCourse);
        }
    }
}
