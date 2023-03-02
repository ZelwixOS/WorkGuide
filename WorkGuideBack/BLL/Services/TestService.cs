using BLL.DTO.Request;
using BLL.DTO.Request.Test;
using BLL.DTO.Response;
using BLL.Interfaces;
using DAL.Interfaces;
using System.Runtime.CompilerServices;

namespace BLL.Services
{
    public class TestService : ITestService
    {
        private ITestRepository testService;
        private ILessonRepository lessonRepository;
        private IUserLessonScoreRepository userLessonScoreRepository;
        private IUserTestAnswerRepository userTestAnswerRepository;

        public TestService(
            ITestRepository testRepository,
            ILessonRepository lessonRepository,
            IUserLessonScoreRepository userLessonScoreRepository,
            IUserTestAnswerRepository userTestAnswerRepository)
        {
            this.testService = testRepository;
            this.lessonRepository = lessonRepository;
            this.userLessonScoreRepository = userLessonScoreRepository;
            this.userTestAnswerRepository = userTestAnswerRepository;
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
            int total = complexTest.Answers.Count;
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

            return new TestResultDto(correct, total);
        }

        public bool? CheckAnswer(TestAnswerDto testAnswer)
        {
            var test = this.testService.GetItem(testAnswer.TestId);

            if (test == null)
            {
                return null;
            }

            var answer = test.Answers.FirstOrDefault(t => t.Id == testAnswer.AnswerId);

            if (answer == null)
            {
                return null;
            }

            return answer.IsValid;
        }
    }
}
