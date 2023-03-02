using BLL.DTO.Request.Test;
using BLL.DTO.Response;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL.Services
{
    public class TestService : ITestService
    {
        private ITestRepository testService;

        public TestService(ITestRepository testRepository)
        {
            this.testService = testRepository;
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
    }
}
