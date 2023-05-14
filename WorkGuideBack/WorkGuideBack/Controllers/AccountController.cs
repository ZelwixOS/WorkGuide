namespace WorkGuideBack.Controllers
{
    using System;
    using System.Threading.Tasks;
    using BLL.DTO.Request.Account;
    using BLL.DTO.Response;
    using BLL.DTO.Response.Account;
    using BLL.Helpers;
    using BLL.Interfaces;
    using DAL.EF;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;
        private readonly DatabaseContext databaseContext;
        private readonly IRolesInitializer rolesInitializer;
        private readonly ILogger logger;

        public AccountController(IAccountService accountService, ILogger<AccountController> logger, DatabaseContext databaseContext, IRolesInitializer rolesInitializer)
        {
            this.accountService = accountService;
            this.logger = logger;
            this.databaseContext = databaseContext;
            this.rolesInitializer = rolesInitializer;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<MessageResultDto>> Register([FromForm] WorkerRegistrationDto model)
        {
            return this.Ok(await accountService.Register(model));
        }

        [HttpPut]
        [Route("UpdateUserInfo/{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<MessageResultDto>> UpdateUserInfo(Guid id, [FromForm] WorkerRegistrationDto model)
        {
            return this.Ok(await accountService.UpdateUserAsync(id, model));
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<MessageResultDto>> Login([FromBody] LogInDto model)
        {
            return await this.accountService.Login(model);
        }

        [HttpPost]
        [Route("LogOut")]
        public async Task<ActionResult<string>> LogOut()
        {
            return Ok(await this.accountService.LogOut());
        }

        [HttpGet]
        [Route("GetCurrentUserInfo")]
        public async Task<ActionResult<UserInfo>> GetCurrentUserInfo()
        {
            return Ok(await this.accountService.GetCurrentUserInfo(HttpContext));
        }

        [HttpGet]
        [Route("Role")]
        public async Task<ActionResult<string>> Role()
        {
            var roles = await this.accountService.GetRole(HttpContext);
            return Ok(roles.FirstOrDefault());
        }

        [HttpPost]
        [Route("Ban/{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Ban(Guid id)
        {
            var res = this.accountService.BanUser(id);
            return Ok(res);
        }

        [HttpPost]
        [Route("Unban/{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Unban(Guid id)
        {
            var res = this.accountService.UnBanUser(id);
            return Ok(res);
        }

        [HttpGet]
        [Route("GetAllWorkers")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<IList<UserInfo>>> GetAllWorkers()
        {
            var res = await this.accountService.GetWorkers();
            return Ok(res);
        }

        [HttpPost]
        [Route("AddRecruit/{mentorId}/{userId}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> AddRecruit(Guid mentorId, Guid userId)
        {
            var res = this.accountService.AddRecruit(mentorId, userId);
            return Ok(res);
        }

        [HttpDelete]
        [Route("DeleteMentor/{userId}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> DeleteMentor(Guid userId)
        {
            var res = this.accountService.DelMentor(userId);
            return Ok(res);
        }

        [HttpGet]
        [Route("GetRecruits")]
        public async Task<ActionResult<List<UserInfo>>> GetRecruits()
        {
            var user = await this.accountService.GetCurrentUserAsync(HttpContext);
            if (user == null)
            {
                return this.Ok(null);
            }

            var res = this.accountService.GetRecruits(user.Id);
            return Ok(res);
        }

        [HttpPost("dbUp")]
        public ActionResult<string> InitDB()
        {
            try
            {
                databaseContext.Database.EnsureCreated();
                databaseContext.Database.Migrate();
                logger.LogInformation("Database migrated successfully.");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while migrating the database.");
            }

            try
            {
                rolesInitializer.CreateUserRoles().Wait();
                logger.LogInformation("Roles created successfully.");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Roles can't be created because of exception.");
            }

            return Ok("Ready");
        }
    }
}
