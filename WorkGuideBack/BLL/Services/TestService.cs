using BLL.DTO.Request;
using BLL.DTO.Request.Test;
using BLL.DTO.Response;
using BLL.DTO.Response.Account;
using BLL.Interfaces;
using DAL.Interfaces;
using DAL.Entities;
using DAL.Migrations;
using Microsoft.EntityFrameworkCore;
using Activity = DAL.Entities.Activity;

namespace BLL.Services
{
    public class TestService : ITestService
    {
        private ITestRepository testService;
        private ILessonRepository lessonRepository;
        private ICourseRepository courseRepository;
        private IUserLessonScoreRepository userLessonScoreRepository;
        private IUserTestAnswerRepository userTestAnswerRepository;
        private IUserCourseRepository userCourseRepository;
        private IUserRepository userRepository;
        private IAnswerRepository answerRepository;
        private IActivityRepository activityRepository;

        public TestService(
            ITestRepository testRepository,
            ILessonRepository lessonRepository,
            ICourseRepository courseRepository,
            IUserLessonScoreRepository userLessonScoreRepository,
            IUserTestAnswerRepository userTestAnswerRepository,
            IUserCourseRepository userCourseRepository,
            IUserRepository userRepository,
            IAnswerRepository answerRepository,
            IActivityRepository activityRepository)
        {
            this.testService = testRepository;
            this.lessonRepository = lessonRepository;
            this.userLessonScoreRepository = userLessonScoreRepository;
            this.userTestAnswerRepository = userTestAnswerRepository;
            this.userCourseRepository = userCourseRepository;
            this.userRepository = userRepository;
            this.answerRepository = answerRepository;
            this.activityRepository = activityRepository;
            this.courseRepository = courseRepository;
        }

        public TestDto GetTest(Guid id)
        {
            var test = this.testService.GetItem(id);
            if (test != null)
            {
                return new TestDto(test);
            }

            return null;
        }

        public TestDto CreateTest(TestCreateRequestDto test)
        {
            var testMod = test.ToModel();
            var res = this.testService.CreateItem(testMod);

            return new TestDto(res);
        }

        public TestDto UpdateTest(TestUpdateRequestDto test)
        {
            var tEntity = this.testService.GetItem(test.Id);

            if (tEntity == null)
            {
                return null;
            }

            foreach(var answer in tEntity.Answers)
            {
                answerRepository.DeleteItem(answer);
            }

            var testMod = test.ToModel();
            var testEntity = this.testService.UpdateItem(testMod);

            return new TestDto(testEntity);
        }

        public int DeleteTest(Guid id)
        {
            var test = this.testService.GetItem(id);
            if (test != null)
            {
                return this.testService.DeleteItem(test);
            }
            
            return 0;
        }

        public TestResultDto CheckComplexTest(ComplexTestAnswersDto complexTest, Guid userId)
        {
            var lesson = this.lessonRepository.GetItem(complexTest.LessonId);
            var course = this.courseRepository.GetItems().Where(c => c.Id == lesson.CourseId).First();

            if (lesson == null)
            {
                return new TestResultDto(0, 0);
            }

            int correct = 0;
            int total = lesson.TestPages.Count;
            bool? result;

            var existingResult = this.userLessonScoreRepository.GetItems().FirstOrDefault(u => u.UserId == userId && u.LessonId == lesson.Id);
            if (existingResult != null)
            {
                return new TestResultDto(existingResult.RightAnswer, existingResult.TestsCount);
            }

            foreach (var testAnswer in complexTest.Answers)
            {
                result = CheckAnswer(testAnswer);
                if (result.HasValue)
                {
                    if (result.Value)
                    {
                        correct++;
                        this.userTestAnswerRepository.CreateItem(
                            new UserTestAnswer()
                            {
                                TestId = testAnswer.TestId,
                                CorrectAnswer = true,
                                UserId = userId
                            });
                    }
                    else
                    {
                        this.userTestAnswerRepository.CreateItem(
                            new UserTestAnswer()
                            {
                                TestId = testAnswer.TestId,
                                CorrectAnswer = false,
                                UserId = userId
                            });
                    }
                }
            }

            this.userLessonScoreRepository.CreateItem(
                new UserLessonScore()
                {
                    UserId= userId,
                    LessonId = complexTest.LessonId,
                    RightAnswer = correct,
                    TestsCount = total
                });

            activityRepository.CreateItem(
                new Activity()
                {
                    UserId = userId,
                    Title = $"Курс \"{course.Name}\"",
                    Content = $"Урок \"{lesson.Name}\"",
                    AdditContent = $"Ваш результат: {correct}/{total}",
                    DateOfCreation = DateTime.Now
                });

            int completedTests = userLessonScoreRepository.GetItems().
                Count(u => u.UserId == userId && u.Lesson.CourseId == lesson.CourseId);

            int totalTests = lessonRepository.GetItems().
                Count(l => l.CourseId == lesson.Id && l.IsComplexTest);

            var userCour = userCourseRepository.GetItems()
                .FirstOrDefault(c => c.CourseId == lesson.CourseId && c.UserId == userId);

            if (userCour != null)
            {
                userCour.CompletedTests = completedTests;
                userCour.TotalTests = totalTests;
                userCourseRepository.UpdateItem(userCour);
            }
            else
            {
                User user = userRepository.GetItem(userId);
                UserCourse userCourse = new UserCourse()
                {
                    CompletedTests = completedTests,
                    TotalTests = totalTests,
                    Course = lesson.Course,
                    CourseId = lesson.CourseId,
                    UserId = userId
                };

                userCourseRepository.CreateItem(userCourse);
            }

            return new TestResultDto(correct, total);
        }

        public bool? CheckAnswer(TestAnswerDto testAnswer)
        {
            var test = this.testService.GetItem(testAnswer.TestId);

            if (test == null)
            {
                return null;
            }

            var answerUser = test.Answers.Where(t => testAnswer.AnswerId.Contains(t.Id))?.ToList();
            var trueAnswerLess = test.Answers.Where(t => t.TestId == testAnswer.TestId && t.IsValid)?.ToList();

            if (answerUser == null || trueAnswerLess == null)
            {
                return null;
            }

            if (answerUser.Count != trueAnswerLess.Count)
            {
                return false;
            }

            return answerUser.All(a => a.IsValid);
        }

        public TestValidAnswersDto GetValidAnswers(Guid id)
        {
            var result = new TestValidAnswersDto();
            var test = this.testService.GetItem(id);

            if (test == null)
            {
                result.Answers = new List<AnswerDto>();
                return result;
            }

            result.Answers = test.Answers.Where(t => t.TestId == id && t.IsValid)?.Select(t => new AnswerDto(t)).ToList() ?? new List<AnswerDto>();

            return result;
        }

        public UserLessonScoreDto GetUserLessonScore(Guid userId, Guid lessonId)
        {
            var userLessonScore = userLessonScoreRepository.GetItems()
                .FirstOrDefault(i => i.UserId == userId && i.LessonId == lessonId);

            if (userLessonScore == null)
            {
                return null;
            }

            return new UserLessonScoreDto(userLessonScore);
        }

        public List<RecruitResultDto> GetRecruitResult(Guid id)
        {
            var recruits = this.userRepository.GetItems()
                .Include(i => i.Recruits).ThenInclude(i => i.UserCourses)
                .FirstOrDefault(i => i.Id == id)?.Recruits.ToList();

            if (recruits == null)
            {
                return null;
            }

            List<RecruitResultDto> result = new List<RecruitResultDto>();

            foreach (var recruit in recruits)
            {
                var courses = recruit.UserCourses.ToList();
                List<RecruitCourseResultDto> recruitCourseResultList = new List<RecruitCourseResultDto>();

                foreach (var course in courses)
                {
                    var recruitResultLesson = userLessonScoreRepository.GetItems()
                        .Where(i => i.UserId == recruit.Id && i.Lesson.CourseId == course.CourseId).ToList();

                    List<RecruitLessonResultDto> recruitLessonResult = new List<RecruitLessonResultDto>();
                    foreach (var lesson in recruitResultLesson)
                    {
                        recruitLessonResult.Add(new RecruitLessonResultDto(lesson.Lesson, new UserLessonScoreDto(lesson)));
                    }
                    
                    var recruitResultCourse = userCourseRepository.GetItems()
                        .FirstOrDefault(i => i.UserId == recruit.Id && i.CourseId == course.CourseId);

                    if (recruitResultCourse != null)
                    {
                        RecruitCourseResultDto recruitCourseResult = new RecruitCourseResultDto(recruitLessonResult, 
                            recruitResultCourse.TotalTests,
                            recruitResultCourse.Course);

                        recruitCourseResultList.Add(recruitCourseResult);
                    }
                    else
                    {
                        RecruitCourseResultDto recruitCourseResult = new RecruitCourseResultDto(new List<RecruitLessonResultDto>(),
                            course.TotalTests,
                            course.Course);

                        recruitCourseResultList.Add(recruitCourseResult);
                    }
                }

                result.Add(new RecruitResultDto(new UserInfo(recruit), recruitCourseResultList));
            }

            return result;
        }
    }
}
