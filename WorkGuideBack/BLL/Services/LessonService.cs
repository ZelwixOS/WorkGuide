using BLL.DTO.Request.Lesson;
using BLL.DTO.Response;
using BLL.Interfaces;
using DAL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BLL.Services
{
    public class LessonService : ILessonService
    {
        private const string PicPath = "ClientApp/lessonsContentPics/";

        private ILessonRepository lessonRepository;
        private ICourseRepository courseRepository;
        private IUserCourseRepository userCourseRepository;
        private IUserLessonScoreRepository userLessonScoreRepository;

        public LessonService(ILessonRepository lessonRepository, ICourseRepository courseRepository, IUserCourseRepository userCourseRepository, IUserLessonScoreRepository userLessonScoreRepository)
        {
            this.lessonRepository = lessonRepository;
            this.courseRepository = courseRepository;
            this.userCourseRepository = userCourseRepository;
            this.userLessonScoreRepository = userLessonScoreRepository;
        }

        public List<LessonDto> GetLessons()
        {
            return this.lessonRepository.GetItems()?.Select(l => new LessonDto(l)).ToList();
        }

        public LessonDto GetLesson(Guid id)
        {
            var lesson = this.lessonRepository.GetItem(id);
            if (lesson != null)
            {
                return new LessonDto(lesson);
            }

            return null;
        }

        public LessonDto GetLesson(string url, int lessonNumber)
        {
            var lesson = this.lessonRepository.GetItems()
                .Include(l => l.Course)
                .Include(l => l.TheoryPages)
                .Include(l => l.TestPages)
                    .ThenInclude(t => t.Answers)
                .FirstOrDefault(l => l.Course.Url == url && l.OrderNumber == lessonNumber);
            if (lesson != null)
            {
                return new LessonDto(lesson);
            }

            return null;
        }

        public LessonDto CreateLesson(LessonCreateRequestDto lesson)
        {
            var les = lesson.ToModel();
            var res = this.lessonRepository.CreateItem(les);

            if (les.IsComplexTest)
            {
                var course = this.courseRepository.GetItem(lesson.CourseId);
                if (course != null)
                {
                    course.TotalTests++;
                    this.courseRepository.UpdateItem(course);
                }
            }

            return new LessonDto(res);
        }

        public LessonDto PublishService(Guid id)
        {
            var lesson = this.lessonRepository.GetItem(id);

            if (lesson != null)
            {
                return new LessonDto(this.lessonRepository.UpdateItem(lesson));
            }

            return null;
        }

        public LessonDto UnpublishService(Guid id)
        {
            var lesson = this.lessonRepository.GetItem(id);

            if (lesson != null)
            {
                return new LessonDto(this.lessonRepository.UpdateItem(lesson));
            }

            return null;
        }

        public LessonDto UpdateLesson(LessonUpdateRequestDto lesson)
        {
            var currLes = this.lessonRepository.GetItems().FirstOrDefault(l => l.Id == lesson.Id);
            if (currLes == null)
            {
                return null;
            }

            var les = lesson.ToModel();

            if (les.IsComplexTest && !currLes.IsComplexTest)
            {
                var course = this.courseRepository.GetItem(lesson.CourseId);
                if (course != null)
                {
                    course.TotalTests++;
                    this.courseRepository.UpdateItem(course);
                }
            }

            if (!les.IsComplexTest && currLes.IsComplexTest)
            {
                var course = this.courseRepository.GetItem(lesson.CourseId);
                var userCourse = this.userCourseRepository.GetItems().Where(i => i.CourseId == lesson.CourseId).ToList();
                if (course != null)
                {
                    course.TotalTests--;
                    this.courseRepository.UpdateItem(course);
                }

                foreach (var item in userCourse)
                {
                    var userResults = this.userLessonScoreRepository.GetItems().FirstOrDefault(i => i.UserId == item.UserId && i.LessonId == lesson.Id);
                    if (userResults != null)
                    {
                        item.CompletedTests--;
                        this.userCourseRepository.UpdateItem(item);
                        this.userLessonScoreRepository.DeleteItem(userResults);
                    }
                }
            }


            var lessonEntity = this.lessonRepository.UpdateItem(les);

            return new LessonDto(lessonEntity);
        }

        public int DeleteLesson(Guid id)
        {
            var lesson = this.lessonRepository.GetItem(id);

            if (lesson.IsComplexTest)
            {
                var course = this.courseRepository.GetItem(lesson.CourseId);
                var userCourse = this.userCourseRepository.GetItems().Where(i => i.CourseId == lesson.CourseId).ToList();
                if (course != null)
                {
                    course.TotalTests--;
                    this.courseRepository.UpdateItem(course);
                }

                foreach (var item in userCourse)
                {
                    var userResults = this.userLessonScoreRepository.GetItems().FirstOrDefault(i => i.UserId == item.UserId && i.LessonId == id);
                    if(userResults != null)
                    {
                        item.CompletedTests--;
                        this.userCourseRepository.UpdateItem(item);
                    }
                }
            }

            if (lesson != null)
            {
                return this.lessonRepository.DeleteItem(lesson);
            }
            else
            {
                return 0;
            }
        }

        public async Task<string> SaveFile(IFormFile picFile)
        {
            string picUrl;
            var format = picFile.FileName.Substring(picFile.FileName.LastIndexOf('.'));
            picUrl = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss") + Guid.NewGuid() + format;

            using (var fs = File.Create(PicPath + picUrl))
            {
                await picFile.CopyToAsync(fs);
            }

            return picUrl;
        }
    }
}
