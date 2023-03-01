using BLL.DTO.Request.Course;
using BLL.DTO.Response;
using BLL.Helpers;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Policy;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ILogger<CourseController> logger;
        private ICourseService courseService;

        public CourseController(ILogger<CourseController> logger, ICourseService courseService)
        {
            this.logger = logger;
            this.courseService = courseService;
        }

        [HttpGet]
        public ActionResult<CourseDto> Get(int page, int itemsOnPage, string? search)
        {
            return this.Ok(this.courseService.GetCourses(page, itemsOnPage, search, true));
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
        [Route("publish/{url}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<CourseDto> Publish(string url)
        {
            return this.Ok(this.courseService.PublishService(url));
        }

        [HttpPost]
        [Route("unpublish/{url}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<CourseDto> Unpublish(string url)
        {
            return this.Ok(this.courseService.UnpublishService(url));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.courseService.DeleteCourse(id));
        }
    }
}
