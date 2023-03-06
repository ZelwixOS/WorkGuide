﻿using BLL.DTO.Request;
using BLL.DTO.Response.Account;
using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WorkGuideBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> logger;
        private IUserService userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            this.logger = logger;
            this.userService = userService;
        }

        [HttpGet("searchUsers")]
        public ActionResult<List<UserInfo>> SearchUsers(string request, int count)
        {
            return this.Ok(this.userService.GetUsersInfo(request, count));
        }

        [HttpGet("id/{id}")]
        public ActionResult<List<UserInfo>> SearchUser(Guid id)
        {
            return this.Ok(this.userService.GetUserInfo(id));
        }
    }
}
