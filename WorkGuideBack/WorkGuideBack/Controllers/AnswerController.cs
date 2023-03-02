using BLL.DTO.Request.Answer;
using BLL.DTO.Response;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BLL.Helpers;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly ILogger<AnswerController> logger;
        private IAnswerService answerService;

        public AnswerController(ILogger<AnswerController> logger, IAnswerService answerService)
        {
            this.logger = logger;
            this.answerService = answerService;
        }

        [HttpGet("id/{id}")]
        public ActionResult<AnswerDto> Get(Guid id)
        {
            return this.Ok(this.answerService.GetAnswer(id));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<AnswerDto> Create([FromForm] AnswerCreateRequestDto answer)
        {
            return this.Ok(this.answerService.CreateAnswer(answer));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<AnswerDto> Update([FromForm] AnswerUpdateRequestDto answer)
        {
            return this.Ok(this.answerService.UpdateAnswer(answer));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.answerService.DeleteAnswer(id));
        }
    }
}
