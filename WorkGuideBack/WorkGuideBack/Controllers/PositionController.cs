using BLL.DTO.Request.Position;
using BLL.DTO.Response;
using BLL.Helpers;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServicePicker.Controllers;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService positionService;
        private readonly ILogger logger;

        public PositionController(IPositionService positionService, ILogger<AccountController> logger)
        {
            this.positionService = positionService;
            this.logger = logger;
        }

        [HttpGet]
        public ActionResult<List<PositionDto>> GetAll()
        {
            return this.Ok(this.positionService.GetAllPositions());
        }

        [HttpGet("id/{id}")]
        public ActionResult<CourseDto> Get(Guid id)
        {
            return this.Ok(this.positionService.GetPosition(id));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<CourseDto>> Create(PositionCreateRequestDto course)
        {
            return this.Ok(this.positionService.CreatePosition(course));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<CourseDto>> Update(PositionUpdateRequestDto course)
        {
            return this.Ok(this.positionService.UpdatePosition(course));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.positionService.DeletePosition(id));
        }
    }
}
