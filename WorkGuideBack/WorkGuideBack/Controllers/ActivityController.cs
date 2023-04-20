using BLL.DTO.Response;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BLL.DTO.Request.Activity;
using BLL.Helpers;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly ILogger<AnswerController> logger;
        private IActivityService activityService;
        private readonly IAccountService accountService;

        public ActivityController(ILogger<AnswerController> logger, IActivityService activityService, IAccountService accountService)
        {
            this.logger = logger;
            this.activityService = activityService;
            this.accountService = accountService;
        }

        [HttpGet("id/{id}")]
        public ActionResult<ActivityDto> Get(Guid id)
        {
            return this.Ok(this.activityService.GetActivity(id));
        }

        [HttpGet("count/{count}")]
        public async Task<ActionResult<List<ActivityDto>>> GetLast(int count)
        {
            var user = await this.accountService.GetCurrentUserAsync(HttpContext);
            if (user == null)
            {
                return this.Ok(null);
            }

            return this.Ok(this.activityService.GetActivities(user.Id, count));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<ActivityDto> Create([FromForm] ActivityCreateRequestDto activity)
        {
            return this.Ok(this.activityService.CreateActivity(activity));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<ActivityDto> Update([FromForm] ActivityUpdateRequestDto activity)
        {
            return this.Ok(this.activityService.UpdateActivity(activity));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.activityService.DeleteActivity(id));
        }
    }
}
