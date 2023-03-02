using BLL.DTO.Request;
using BLL.DTO.Request.Test;
using BLL.DTO.Response;

namespace BLL.Interfaces
{
    public interface ITestService
    {
        bool? CheckAnswer(TestAnswerDto testAnswer);
        TestResultDto CheckComplexTest(ComplexTestAnswersDto complexTest, Guid userId);
        TestDto CreateTest(TestCreateRequestDto test);
        int DeleteTest(Guid id);
        TestDto GetTest(Guid id);
        TestDto UpdateTest(TestUpdateRequestDto test);
    }
}
