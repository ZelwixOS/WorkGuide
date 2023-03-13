using BLL.DTO.Request;
using BLL.DTO.Request.Test;
using BLL.DTO.Response;
using BLL.Interfaces;
using DAL.Interfaces;
using System.Runtime.CompilerServices;
using DAL.Entities;

namespace BLL.Services
{
    public class TestService : ITestService
    {
        private ITestRepository testService;
        private ILessonRepository lessonRepository;
        private IUserLessonScoreRepository userLessonScoreRepository;
        private IUserTestAnswerRepository userTestAnswerRepository;
        private IUserCourseRepository userCourseRepository;
        private IUserRepository userRepository;

        public TestService(
            ITestRepository testRepository,
            ILessonRepository lessonRepository,
            IUserLessonScoreRepository userLessonScoreRepository,
            IUserTestAnswerRepository userTestAnswerRepository,
            IUserCourseRepository userCourseRepository,
            IUserRepository userRepository)
        {
            this.testService = testRepository;
            this.lessonRepository = lessonRepository;
            this.userLessonScoreRepository = userLessonScoreRepository;
            this.userTestAnswerRepository = userTestAnswerRepository;
            this.userCourseRepository = userCourseRepository;
            this.userRepository = userRepository;
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
            else
            {
                return 0;
            }
        }

        public TestResultDto CheckComplexTest(ComplexTestAnswersDto complexTest, Guid userId)
        {
            var lesson = this.lessonRepository.GetItem(complexTest.LessonId);

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
                            new DAL.Entities.UserTestAnswer()
                            {
                                TestId = testAnswer.TestId,
                                CorrectAnswer = true,
                                UserId = userId
                            });
                    }
                    else
                    {
                        this.userTestAnswerRepository.CreateItem(
                            new DAL.Entities.UserTestAnswer()
                            {
                                TestId = testAnswer.TestId,
                                CorrectAnswer = false,
                                UserId = userId
                            });
                    }
                }
            }

            this.userLessonScoreRepository.CreateItem(
                new DAL.Entities.UserLessonScore()
                {
                    UserId= userId,
                    LessonId = complexTest.LessonId,
                    RightAnswer = correct,
                    TestsCount = total
                });

            int completedTests = userLessonScoreRepository.GetItems().
                Where(u => u.UserId == userId && u.Lesson.CourseId == lesson.CourseId).Count();

            int totalTests = lessonRepository.GetItems().
                Where(l => l.CourseId == lesson.Id && l.IsComplexTest).Count();

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
                    UserId = userId,
                    User = user
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
    }
}
