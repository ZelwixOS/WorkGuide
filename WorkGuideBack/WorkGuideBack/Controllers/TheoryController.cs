using BLL.DTO.Request.Theory;
using BLL.DTO.Response;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BLL.Helpers;
using BLL.DTO.Request;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheoryController : ControllerBase
    {
        private readonly ILogger<TheoryController> logger;
        private ITheoryService theoryService;

        public TheoryController(ILogger<TheoryController> logger, ITheoryService theoryService)
        {
            this.logger = logger;
            this.theoryService = theoryService;
        }

        [HttpGet("id/{id}")]
        public ActionResult<TheoryDto> Get(Guid id)
        {
            return this.Ok(this.theoryService.GetTheory(id));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<TheoryDto>> Create([FromForm] TheoryCreateRequestDto theory)
        {
            return this.Ok(await this.theoryService.CreateTheoryAsync(theory));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<TheoryDto> Update([FromBody] TheoryUpdateRequestDto theory)
        {
            return this.Ok(this.theoryService.UpdateTheory(theory));
        }

        [HttpPost("createFile/{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<TheoryDto>> CreateFile(Guid id, [FromForm] CreateFileRequestDto file)
        {
            return this.Ok(await this.theoryService.CreateTheoryFile(id, file));
        }

        [HttpDelete("deleteFile/{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> DeleteFile(Guid id)
        {
            return this.Ok(this.theoryService.DeleteTheoryFile(id));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.theoryService.DeleteTheory(id));
        }
    }
}
