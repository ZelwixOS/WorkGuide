using BLL.DTO.Request.Course;
using BLL.DTO.Response;
using BLL.Helpers;
using BLL.Interfaces;
using DAL.Entities;
using DAL.Interfaces;
using System.Linq;

namespace BLL.Services
{
    public class CourseService : ICourseService
    {
        private const string PicPath = "ClientApp/coursePics/";

        private ICourseRepository courseRepository;
        private IPositionRepository positionRepository;
        private IPositionCourseRepository positionCourseRepository;
        private IUserCourseRepository userCourseRepository;
        private INotificationRepository notificationRepository;
        private IUserRepository userRepository;
        private INotificationUserRepository notificationUserRepository;

        public CourseService(ICourseRepository categoryRepository, 
            IPositionRepository positionRepository, 
            IPositionCourseRepository positionCourseRepository,
            IUserCourseRepository userCourseRepository,
            INotificationRepository notificationRepository,
            IUserRepository userRepository,
            INotificationUserRepository notificationUserRepository)
        {
            this.courseRepository = categoryRepository;
            this.positionRepository = positionRepository;
            this.positionCourseRepository = positionCourseRepository;
            this.userCourseRepository = userCourseRepository;
            this.notificationRepository = notificationRepository;
            this.userRepository = userRepository;
            this.notificationUserRepository = notificationUserRepository;
        }

        public PaginatedData<CourseDto> GetCourses(int page, int itemsOnPage, string? search, bool published, User user)
        {
            if (user == null)
            {
                return null;
            }

            if (search == "\"\"")
            {
                search = null;
            }

            var courses = courseRepository
            .GetItems()
                .Where(s => !published || s.Published)
                .Where(s => string.IsNullOrEmpty(search) || s.Name.Contains(search))
                .Where(s => !published || s.PositionCourses.Any(pc => pc.PositionId == user.PositionId));

            var result = Paginator<Course>.ElementsOfPage(courses, page, itemsOnPage);

            var paginatedData = new PaginatedData<CourseDto>(result.Data.Select(s =>
            {
                var userCourse = userCourseRepository.GetItems()
                    .FirstOrDefault(u => u.CourseId == s.Id && u.UserId == user.Id);

                if (userCourse == null)
                {
                   return new CourseDto(s);
                }
                
                return new CourseDto(s, userCourse);
            }).ToList(), result.CurrentPage, result.MaxPage);

            return paginatedData;
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

                if (course.PositionCourses != null)
                    foreach (var position in course.PositionCourses)
                    {
                        var positionId = position.PositionId;
                        var users = this.userRepository.GetItems()
                            .Where(i => i.Position.Id == positionId)?.ToList();
                        if (users == null)
                        {
                            continue;
                        }

                        var notificationMod = new Notification()
                        {
                            DateOfCreation = DateTime.Now,
                            Title = "Опубликован новый курс: " + course.Name,
                        };

                        this.notificationRepository.CreateItem(notificationMod);

                        foreach (var i in users)
                        {
                            this.notificationUserRepository.CreateItem(
                                new NotificationUser()
                                {
                                    UserId = i.Id,
                                    Read = false,
                                    NotificationId = notificationMod.Id
                                });
                        }
                    }

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
            var courEntity = courseRepository.GetItems().FirstOrDefault(c => c.Id == course.Id);

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

            PositionCourse? positionCourse = positionCourseRepository.GetItems()
                .FirstOrDefault(i => i.CourseId == id && i.PositionId == positionId);

            if (positionCourse != null)
            {
                return new CourseDto(course);
            }

            positionCourse = new PositionCourse() 
            {
                PositionId = positionId, 
                CourseId = id,
            };

            positionCourseRepository.CreateItem(positionCourse);
            course.PositionCourses.Add(positionCourse);

            if (course.Published)
            {
                var users = this.userRepository.GetItems()
                    .Where(i => i.Position.Id == positionId)?.ToList();
                if (users == null)
                {
                    return new CourseDto(course);
                }

                var notificationMod = new Notification()
                {
                    DateOfCreation = DateTime.Now,
                    Title = "Получен доступ к новому курсу: " + course.Name,
                };

                this.notificationRepository.CreateItem(notificationMod);

                foreach (var i in users)
                {
                    this.notificationUserRepository.CreateItem(
                        new NotificationUser()
                        {
                            UserId = i.Id,
                            Read = false,
                            NotificationId = notificationMod.Id
                        });
                }
            }

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

            PositionCourse? positionCourse = positionCourseRepository.GetItems()
                .FirstOrDefault(i => i.CourseId == id && i.PositionId == positionId);

            if (positionCourse == null)
            {
                return false;
            }

            return positionCourseRepository.DeleteItem(positionCourse) > 0;
        }

        public List<PositionDto> GetPositions(Guid id)
        {
            var course = this.courseRepository.GetItem(id);

            if (course == null)
            {
                return null;
            }

            return course.PositionCourses?.Select(pc => new PositionDto(pc.Position)).ToList();
        }
    }
}
