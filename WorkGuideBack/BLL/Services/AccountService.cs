namespace BLL.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using DTO.Request.Account;
    using DTO.Response.Account;
    using Helpers;
    using Interfaces;
    using DAL.Entities;
    using DAL.Interfaces;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Configuration;
    using Answer = Helpers.Constants.AnswerMessage;
    using Role = Helpers.Constants.RoleManager;

    public class AccountService : IAccountService
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IConfiguration config;
        private readonly IUserRepository userRepository;
        private readonly IPositionRepository positionRepository;

        public AccountService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration config,
            IUserRepository userRepository,
            IPositionRepository positionRepository)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.userRepository = userRepository;
            this.config = config;
            this.positionRepository = positionRepository;
        }

        public async Task<MessageResultDto> Login(LogInDto model)
        {
            var user = this.userRepository.GetItems().FirstOrDefault(u => u.UserName == model.Login && !u.Banned);
            if (user == null)
            {
                return new MessageResultDto(Answer.LoginError, new List<string> { "Пользователь не найден" });
            }

            var result = await this.signInManager.PasswordSignInAsync(model.Login, model.Password, model.RememberMe, true);
            if (result.Succeeded)
            {
                return new MessageResultDto(Answer.LoggedAs + model.Login, null, Constants.AnswerCodes.SignedIn);
            }
            else
            {
                List<string> err = new List<string>();
                err.Add(Answer.WrongCreds);

                return new MessageResultDto(Answer.LoginError, err);
            }
        }

        public async Task<string> LogOut()
        {
            await this.signInManager.SignOutAsync();
            return Answer.LogOutSucceed;
        }

        public async Task<MessageResultDto> Register(WorkerRegistrationDto model)
        {
            Position position = positionRepository.GetItem(model.PositionId);

            if (position == null)
            {
                return new MessageResultDto(Answer.RegisteredUnsuccessfully, new List<string>() {"Wrong position!"});
            }

            User user = new User
            {
                Email = model.Email,
                UserName = model.Login,
                FirstName = model.FirstName,
                SecondName = model.SecondName,
                PhoneNumber = model.PhoneNumber,
                Avatar = "defaultAvatar",
                PositionId = model.PositionId
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await this.userManager.AddToRoleAsync(user, Role.Worker);

                await this.signInManager.SignInAsync(user, false);

                var msg = Answer.RegisteredSuccessfully + user.UserName;

                return new MessageResultDto(msg, null, Constants.AnswerCodes.SignedIn);
            }
            else
            {
                List<string> errorList = new List<string>();
                foreach (var error in result.Errors)
                {
                    errorList.Add(error.Description);
                }

                return new MessageResultDto(Answer.RegisteredUnsuccessfully, errorList);
            }
        }

        public int BanUser(Guid id)
        {
            var user = this.userRepository.GetItem(id);
            if (user == null)
            {
                return 0;
            }

            user.Banned = true;

            var res = this.userRepository.UpdateUser(user);

            return res == null ? 0 : 1;
        }

        public int UnBanUser(Guid id)
        {
            var user = this.userRepository.GetItem(id);
            if (user == null)
            {
                return 0;
            }

            user.Banned = false;

            var res = this.userRepository.UpdateUser(user);

            return res == null ? 0 : 1;
        }

        public Task<User> GetCurrentUserAsync(HttpContext httpCont) => this.userManager.GetUserAsync(httpCont?.User);

        public async Task<IList<string>> GetRole(HttpContext httpCont)
        {
            var usr = await this.userManager.GetUserAsync(httpCont?.User);
            if (usr != null)
            {
                return await this.userManager.GetRolesAsync(usr);
            }

            var rolesList = new List<string>();
            rolesList.Add(Constants.RoleManager.Guest);
            return rolesList;
        }

        public Task<IList<User>> GetByRole(string role)
        {
            return this.userManager.GetUsersInRoleAsync(role);
        }

        public async Task<IList<UserInfo>> GetWorkers()
        {
            return (await GetByRole(Constants.RoleManager.Worker))?.Select(u => new UserInfo(userRepository.GetItem(u.Id)))?.ToList();
        }

        public async Task<UserInfo> GetCurrentUserInfo(HttpContext httpCont)
        {
            User usr = await GetCurrentUserAsync(httpCont);
            if (usr != null)
            {
                string role = (await this.userManager.GetRolesAsync(usr)).FirstOrDefault();
                if (role != null)
                {
                    var user = userRepository.GetItem(usr.Id);
                    var userInfo = new UserInfo(user, role);
                    return userInfo;
                }
            }

            return null;
        }
    }
}
