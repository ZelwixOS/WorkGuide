using BLL.DTO.Request.Theory;
using BLL.DTO.Response;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BLL.Helpers;

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
        public ActionResult<TheoryDto> Create([FromBody] TheoryCreateRequestDto theory)
        {
            return this.Ok(this.theoryService.CreateTheory(theory));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<TheoryDto> Update([FromBody] TheoryUpdateRequestDto theory)
        {
            return this.Ok(this.theoryService.UpdateTheory(theory));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.theoryService.DeleteTheory(id));
        }
    }
}
