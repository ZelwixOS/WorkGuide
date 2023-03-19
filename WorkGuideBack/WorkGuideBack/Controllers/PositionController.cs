using BLL.DTO.Request.Lesson;
using BLL.DTO.Request;
using BLL.DTO.Response;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using BLL.DTO.Request.Position;
using BLL.Helpers;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly ILogger<PositionController> logger;
        private IPositionService positionService;

        public PositionController(ILogger<PositionController> logger, IPositionService positionService)
        {
            this.logger = logger;
            this.positionService = positionService;
        }

        [HttpGet("id/{id}")]
        public ActionResult<PositionDto> Get(Guid id)
        {
            return this.Ok(this.positionService.GetPosition(id));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<PositionDto> Create([FromBody] PositionCreateRequestDto lesson)
        {
            return this.Ok(this.positionService.CreatePosition(lesson));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<PositionDto> Update([FromBody] PositionUpdateRequestDto lesson)
        {
            return this.Ok(this.positionService.UpdatePosition(lesson));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.positionService.DeletePosition(id));
        }
    }
}
