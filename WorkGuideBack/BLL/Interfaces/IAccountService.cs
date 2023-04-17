namespace BLL.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using BLL.DTO.Request.Account;
    using BLL.DTO.Response.Account;
    using DAL.Entities;
    using Microsoft.AspNetCore.Http;

    public interface IAccountService
    {
        public Task<MessageResultDto> Login(LogInDto model);

        public Task<string> LogOut();

        public Task<MessageResultDto> Register(WorkerRegistrationDto model);

        public Task<User> GetCurrentUserAsync(HttpContext httpCont);

        public Task<IList<string>> GetRole(HttpContext httpCont);

        public Task<IList<User>> GetByRole(string role);

        public Task<UserInfo> GetCurrentUserInfo(HttpContext httpCont);

        public int BanUser(Guid id);

        public int UnBanUser(Guid id);
        Task<IList<UserInfo>> GetWorkers();
        Task<UserInfo> UpdateUserAsync(Guid userId, WorkerRegistrationDto model);
    }
}
