﻿using BLL.DTO.Request.Course;
using BLL.DTO.Response;
using BLL.Helpers;
using BLL.Interfaces;
using DAL.Entities;
using DAL.Interfaces;

namespace BLL.Services
{
    public class CourseService : ICourseService
    {
        private const string PicPath = "ClientApp/coursePics/";

        private ICourseRepository courseRepository;
        private IPositionRepository positionRepository;
        private IPositionCourseRepository positionCourseRepository;

        public CourseService(ICourseRepository categoryRepository, IPositionRepository positionRepository, IPositionCourseRepository positionCourseRepository)
        {
            this.courseRepository = categoryRepository;
            this.positionRepository = positionRepository;
            this.positionCourseRepository = positionCourseRepository;
        }

        public PaginatedData<CourseDto> GetCourses(int page, int itemsOnPage, string search, bool published)
        {
            if (search == "\"\"")
            {
                search = null;
            }

            var courses = courseRepository
            .GetItems()
                .Where(s => !published || s.Published)
                .Where(s => string.IsNullOrEmpty(search) || s.Name.Contains(search));

            var result = Paginator<Course>.ElementsOfPage(courses, page, itemsOnPage);
            return new PaginatedData<CourseDto>(result.Data.Select(s => new CourseDto(s)).ToList(), result.CurrentPage, result.MaxPage);
        }

        public CourseDto GetCourse(Guid id)
        {
            var course = courseRepository.GetItem(id);
            if (course != null)
            {
                return new CourseDto(course);
            }

            return null;
        }

        public CourseDto GetCourse(string url)
        {
            var course = courseRepository.GetItem(url);
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

            var res = courseRepository.CreateItem(cour);

            return new CourseDto(res);
        }

        public CourseDto PublishService(Guid id)
        {
            var course = courseRepository.GetItem(id);

            if (course != null)
            {
                course.Published = true;
                return new CourseDto(courseRepository.UpdateItem(course));
            }

            return null;
        }

        public CourseDto UnpublishService(Guid id)
        {
            var course = this.courseRepository.GetItem(id);

            if (course != null)
            {
                course.Published = false;
                return new CourseDto(courseRepository.UpdateItem(course));
            }

            return null;
        }

        public async Task<CourseDto> UpdateCourseAsync(CourseUpdateRequestDto course)
        {
            var courEntity = courseRepository.GetItem(course.Id);

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
            var courseEntity = courseRepository.UpdateItem(cour);

            return new CourseDto(courseEntity);
        }

        public int DeleteCourse(Guid id)
        {
            var category = courseRepository.GetItem(id);
            if (category != null)
            {
                return courseRepository.DeleteItem(category);
            }
            else
            {
                return 0;
            }
        }

        public CourseDto AddPosition(Guid id, Guid positionId)
        {
            var course = this.courseRepository.GetItem(id);
            var position = positionRepository.GetItem(positionId);

            if (course == null || position == null)
            {
                return null;
            }

            PositionCourse positionCourse = positionCourseRepository.GetItems()
                .FirstOrDefault(i => i.CourseId == id && i.PositionId == positionId);

            if (positionCourse != null)
            {
                return new CourseDto(course);
            }

            positionCourse = new PositionCourse() 
            {
                PositionId = positionId, 
                CourseId = id, 
                Position = position, 
                Course = course

            };

            positionCourseRepository.CreateItem(positionCourse);
            course.PositionCourses.Add(positionCourse);

            return new CourseDto(course);
        }

        public bool DeletePosition(Guid id, Guid positionId)
        {
            var course = this.courseRepository.GetItem(id);
            var position = positionRepository.GetItem(positionId);

            if (course == null || position == null)
            {
                return false;
            }

            PositionCourse positionCourse = positionCourseRepository.GetItems()
                .FirstOrDefault(i => i.CourseId == id && i.PositionId == positionId);

            if (positionCourse == null)
            {
                return false;
            }

            return course.PositionCourses.Remove(positionCourse);
        }
    }
}
