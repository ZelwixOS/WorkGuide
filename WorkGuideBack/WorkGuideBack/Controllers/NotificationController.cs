using BLL.DTO.Response;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BLL.DTO.Request.Notification;
using BLL.Helpers;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService notificationService;
        private readonly ILogger logger;
        private readonly IUserService userService;
        private readonly IAccountService accountService;

        public NotificationController(INotificationService notificationService,
            ILogger<AccountController> logger,
            IUserService userService,
            IAccountService accountService)
        {
            this.notificationService = notificationService;
            this.logger = logger;
            this.userService = userService;
            this.accountService = accountService;
        }

        [HttpGet]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<List<NotificationDto>> GetAll()
        {
            return this.Ok(this.notificationService.GetAllNotifications());
        }

        [HttpGet("user")]
        public async Task<ActionResult<List<NotificationUserDto>>> GetAllUser()
        {
            var user = await this.accountService.GetCurrentUserAsync(HttpContext);
            if (user == null)
            {
                return this.Ok(null);
            }
            return this.Ok(this.notificationService.GetAllNotificationsUser(user.Id));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<NotificationDto> Get(Guid id)
        {
            return this.Ok(this.notificationService.GetNotification(id));
        }

        [HttpPost("user/{userId}")]
        public ActionResult<NotificationDto> CreateUser([FromBody] NotificationCreateRequestDto notification, Guid userId)
        {
            return this.Ok(this.notificationService.CreateNotificationUser(notification, userId));
        }

        [HttpPost("position/{positionId}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<NotificationDto> CreatePosition([FromBody] NotificationCreateRequestDto notification, Guid positionId)
        {
            return this.Ok(this.notificationService.CreateNotificationPosition(notification, positionId));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<NotificationDto> Update([FromBody] NotificationUpdateRequestDto notification)
        {
            return this.Ok(this.notificationService.UpdateNotification(notification));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.notificationService.DeleteNotification(id));
        }

        [HttpPost("readT/{id}")]
        public async Task<ActionResult<List<NotificationUserDto>>> ReadTrue(Guid id)
        {
            var user = await this.accountService.GetCurrentUserAsync(HttpContext);
            if (user == null)
            {
                return this.Ok(null);
            }
            return this.Ok(this.notificationService.ReadNotification(id, user.Id));
        }

        [HttpPost("readF/{id}")]
        public async Task<ActionResult<List<NotificationUserDto>>> ReadFalse(Guid id)
        {
            var user = await this.accountService.GetCurrentUserAsync(HttpContext);
            if (user == null)
            {
                return this.Ok(null);
            }
            return this.Ok(this.notificationService.ReadNotNotification(id, user.Id));
        }
    }
}
