using BLL.DTO.Request.Course;
using BLL.DTO.Request.Lesson;
using BLL.DTO.Response;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BLL.Helpers;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ILogger<LessonController> logger;
        private ILessonService _lessonService;

        public LessonController(ILogger<LessonController> logger, ICourseService _lessonService)
        {
            this.logger = logger;
            _lessonService = _lessonService;
        }

        [HttpGet]
        public ActionResult<LessonDto> Get(int page, int itemsOnPage, string? search)
        {
            return this.Ok(_lessonService.GetLessons(page, itemsOnPage, search));
        }

        [HttpGet("id/{id}")]
        public ActionResult<LessonDto> Get(Guid id)
        {
            return this.Ok(_lessonService.GetLesson(id));
        }

        [HttpGet("url/{url}")]
        public ActionResult<LessonDto> Get(string url)
        {
            return this.Ok(_lessonService.GetLesson(url));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<LessonDto>> Create([FromForm] LessonCreateRequestDto lesson)
        {
            return this.Ok(await _lessonService.CreateLessonAsync(lesson));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<LessonDto>> Update([FromForm] LessonUpdateRequestDto lesson)
        {
            return this.Ok(await _lessonService.UpdateLessonAsync(lesson));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(_lessonService.DeleteLesson(id));
        }
    }
}
