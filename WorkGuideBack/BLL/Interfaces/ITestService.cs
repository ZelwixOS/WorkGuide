using BLL.DTO.Request;
using BLL.DTO.Request.Test;
using BLL.DTO.Response;

namespace BLL.Interfaces
{
    public interface ITestService
    {
        bool? CheckAnswer(TestAnswerDto testAnswer);
        TestResultDto CheckComplexTest(ComplexTestAnswersDto complexTest, Guid userId);
        UserLessonScoreDto GetUserLessonScore(Guid userId, Guid lessonId);
        TestDto CreateTest(TestCreateRequestDto test);
        int DeleteTest(Guid id);
        TestDto GetTest(Guid id);
        TestDto UpdateTest(TestUpdateRequestDto test);
        TestValidAnswersDto GetValidAnswers(Guid id); 
        List<RecruitResultDto> GetRecruitResult(Guid id);
    }
}
