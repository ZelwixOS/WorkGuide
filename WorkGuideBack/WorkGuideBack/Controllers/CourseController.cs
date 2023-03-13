using BLL.DTO.Request.Course;
using BLL.DTO.Response;
using BLL.Helpers;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Policy;
using DAL.Entities;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ILogger<CourseController> logger;
        private ICourseService courseService;
        private IAccountService accountService;

        public CourseController(ILogger<CourseController> logger, ICourseService courseService, IAccountService accountService)
        {
            this.logger = logger;
            this.courseService = courseService;
            this.accountService = accountService;
        }

        [HttpGet]
        public async Task<ActionResult<CourseDto>> Get(int page, int itemsOnPage, string? search)
        {
            var user = await this.accountService.GetCurrentUserAsync(HttpContext);
            if (user == null)
            {
                return this.Ok(null);
            }

            var roles = await this.accountService.GetRole(HttpContext);
            return this.Ok(this.courseService.GetCourses(page, itemsOnPage, search, !roles.Contains(Constants.RoleManager.Admin), user));
        }

        [HttpGet("id/{id}")]
        public ActionResult<CourseDto> Get(Guid id)
        {
            return this.Ok(this.courseService.GetCourse(id));
        }

        [HttpGet("url/{url}")]
        public ActionResult<CourseDto> Get(string url)
        {
            return this.Ok(this.courseService.GetCourse(url));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<CourseDto>> Create([FromForm] CourseCreateRequestDto course)
        {
            return this.Ok(await this.courseService.CreateCourseAsync(course));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<CourseDto>> Update([FromForm] CourseUpdateRequestDto course)
        {
            return this.Ok(await this.courseService.UpdateCourseAsync(course));
        }

        [HttpPost]
        [Route("publish/{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<CourseDto> Publish(Guid id)
        {
            return this.Ok(this.courseService.PublishService(id));
        }

        [HttpPost]
        [Route("unpublish/{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<CourseDto> Unpublish(Guid id)
        {
            return this.Ok(this.courseService.UnpublishService(id));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.courseService.DeleteCourse(id));
        }

        [HttpDelete("{id}/{positionId}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<bool> DeletePosition(Guid id, Guid positionId)
        {
            return this.Ok(this.courseService.DeletePosition(id, positionId));
        }

        [HttpPost("{id}/{positionId}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<CourseDto> AddPosition(Guid id, Guid positionId)
        {
            return this.Ok(this.courseService.AddPosition(id, positionId));
        }
    }
}
