using BLL.DTO.Request.Test;
using BLL.DTO.Response;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BLL.Helpers;
using BLL.DTO.Request;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> logger;
        private ITestService testService;
        private IAccountService accountService;

        public TestController(ILogger<TestController> logger, ITestService testService, IAccountService accountService)
        {
            this.logger = logger;
            this.testService = testService;
            this.accountService = accountService;
        }

        [HttpGet("id/{id}")]
        public ActionResult<TestDto> Get(Guid id)
        {
            return this.Ok(this.testService.GetTest(id));
        }

        [HttpGet("answers/{id}")]
        public ActionResult<TestValidAnswersDto> GetAnswers(Guid id)
        {
            return this.Ok(this.testService.GetValidAnswers(id));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<TestDto> Create([FromBody] TestCreateRequestDto test)
        {
            return this.Ok(this.testService.CreateTest(test));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<TestDto> Update([FromBody] TestUpdateRequestDto test)
        {
            return this.Ok(this.testService.UpdateTest(test));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.testService.DeleteTest(id));
        }

        [HttpPost("checkAnswer")]
        public ActionResult<bool> CheckAnswer(TestAnswerDto testAnswer)
        {
            return this.Ok(this.testService.CheckAnswer(testAnswer) ?? false);
        }

        [HttpPost("checkTest")]
        public async Task<ActionResult<TestResultDto>> CheckAnswerAsync(ComplexTestAnswersDto testAnswers)
        {
            var user = await this.accountService.GetCurrentUserAsync(HttpContext);
            if (user == null)
            {
                return this.Ok(null);
            }

            return this.Ok(this.testService.CheckComplexTest(testAnswers, user.Id));
        }

        [HttpGet("userLessonScore/{lessonId}")]
        public async Task<ActionResult<UserLessonScoreDto>> GetUserLessonScore(Guid lessonId)
        {
            var user = await this.accountService.GetCurrentUserAsync(HttpContext);
            if (user == null)
            {
                return this.Ok(null);
            }

            return this.Ok(this.testService.GetUserLessonScore(user.Id, lessonId));
        }

        [HttpGet("GetRecruitResult")]
        public async Task<ActionResult<RecruitResultDto>> GetRecruitResult()
        {
            var user = await this.accountService.GetCurrentUserAsync(HttpContext);
            if (user == null)
            {
                return this.Ok(null);
            }

            return this.Ok(this.testService.GetRecruitResult(user.Id));
        }
    }
}
