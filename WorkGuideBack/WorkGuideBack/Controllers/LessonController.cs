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
        private ILessonService lessonService;

        public LessonController(ILogger<LessonController> logger, ILessonService lessonService)
        {
            this.logger = logger;
            this.lessonService = lessonService;
        }

        [HttpGet("id/{id}")]
        public ActionResult<LessonDto> Get(Guid id)
        {
            return this.Ok(this.lessonService.GetLesson(id));
        }

        [HttpGet("url/{url}/{lessonNumber}")]
        public ActionResult<LessonDto> Get(string url, int lessonNumber)
        {
            return this.Ok(this.lessonService.GetLesson(url, lessonNumber));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<LessonDto> Create([FromBody] LessonCreateRequestDto lesson)
        {
            return this.Ok(this.lessonService.CreateLesson(lesson));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<LessonDto> Update([FromBody] LessonUpdateRequestDto lesson)
        {
            return this.Ok(this.lessonService.UpdateLesson(lesson));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.lessonService.DeleteLesson(id));
        }
    }
}
