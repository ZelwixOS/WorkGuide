using BLL.DTO.Request.Achievement;
using BLL.DTO.Response;
using BLL.Helpers;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AchievementController : ControllerBase
    {
        private readonly ILogger<AchievementController> logger;
        private IAchievementService achievementService;
        private IAccountService accountService;

        public AchievementController(ILogger<AchievementController> logger, IAchievementService achievementService, IAccountService accountService)
        {
            this.logger = logger;
            this.achievementService = achievementService;
            this.accountService = accountService;
        }

        [HttpGet("user")]
        public async Task<ActionResult<List<AchievementDto>>> GetAchievements([FromQuery] Guid? courseId)
        {
            var user = await this.accountService.GetCurrentUserAsync(HttpContext);
            if (user == null)
            {
                return this.Ok(null);
            }

            return this.Ok(this.achievementService.GetAllAchievements(user.Id, courseId));
        }

        [HttpGet("all")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<List<AchievementDto>> GetAllAchievements([FromQuery] Guid? courseId)
        {
            return this.Ok(this.achievementService.GetAllAchievements(courseId));
        }

        [HttpGet("{id}")]
        public ActionResult<AchievementTechnicalInfoDto> GetAllAchievement(Guid id)
        {
            return this.Ok(this.achievementService.GetAchievement(id));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<AchievementDto>> CreateAsync([FromForm] AchievementCreateRequestDto achievement)
        {
            return this.Ok(await this.achievementService.CreateAchievementAsync(achievement));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<AchievementDto>> UpdateAsync([FromForm] AchievementUpdateRequestDto achievement)
        {
            return this.Ok(await this.achievementService.UpdateAchievementAsync(achievement));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.achievementService.DeleteAchievement(id));
        }
    }
}

