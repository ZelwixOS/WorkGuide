using BLL.DTO.Request.Test;
using BLL.DTO.Response;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BLL.Helpers;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> logger;
        private ITestService testService;

        public TestController(ILogger<TestController> logger, ITestService testService)
        {
            this.logger = logger;
            this.testService = testService;
        }

        [HttpGet("id/{id}")]
        public ActionResult<TestDto> Get(Guid id)
        {
            return this.Ok(this.testService.GetTest(id));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<TestDto> Create([FromForm] TestCreateRequestDto test)
        {
            return this.Ok(this.testService.CreateTest(test));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<TestDto> Update([FromForm] TestUpdateRequestDto test)
        {
            return this.Ok(this.testService.UpdateTest(test));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.testService.DeleteTest(id));
        }
    }
}
