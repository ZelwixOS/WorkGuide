using BLL.DTO.Request.Course;
using BLL.DTO.Response;
using BLL.Helpers;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ILogger<CourseController> logger;
        private ICourseService _courseService;

        public CourseController(ILogger<CourseController> logger, ICourseService courseService)
        {
            this.logger = logger;
            _courseService = courseService;
        }

        [HttpGet]
        public ActionResult<CourseDto> Get(int page, int itemsOnPage, string? search)
        {
            return this.Ok(_courseService.GetCourses(page, itemsOnPage, search, true));
        }

        [HttpGet("id/{id}")]
        public ActionResult<CourseDto> Get(Guid id)
        {
            return this.Ok(_courseService.GetCourse(id));
        }

        [HttpGet("url/{url}")]
        public ActionResult<CourseDto> Get(string url)
        {
            return this.Ok(_courseService.GetCourse(url));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<CourseDto>> Create([FromBody] CourseCreateRequestDto course)
        {
            return this.Ok(await _courseService.CreateCourseAsync(course));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<CourseDto>> Update([FromBody] CourseUpdateRequestDto course)
        {
            return this.Ok(await _courseService.UpdateCourseAsync(course));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(_courseService.DeleteCourse(id));
        }
    }
}
