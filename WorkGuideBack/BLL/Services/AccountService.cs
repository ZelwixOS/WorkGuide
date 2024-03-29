﻿using Microsoft.EntityFrameworkCore;

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
    using DAL.Migrations;

    public class AccountService : IAccountService
    {
        private const string PicPath = "ClientApp/avatars/";

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

            string avatar;

            if (model.Avatar != null)
            {
                var format = model.Avatar.FileName.Substring(model.Avatar.FileName.LastIndexOf('.'));
                avatar = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss") + Guid.NewGuid() + format;

                using (var fs = File.Create(PicPath + avatar))
                {
                    await model.Avatar.CopyToAsync(fs);
                }
            }
            else
            {
                avatar = "defaultAvatar";
            }

            User user = new User
            {
                Email = model.Email,
                UserName = model.Login,
                FirstName = model.FirstName,
                SecondName = model.SecondName,
                PhoneNumber = model.PhoneNumber,
                Avatar = avatar,
                PositionId = model.PositionId,
                MentorId = model.MentorId,
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await this.userManager.AddToRoleAsync(user, Role.Worker);

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

        public async Task<UserInfo> UpdateUserAsync(Guid userId, WorkerRegistrationDto model)
        {
            var user = await this.userManager.FindByIdAsync(userId.ToString());

            if (user == null)
            {
                return null;
            }

            var us = model;

            user.FirstName = us.FirstName;
            user.SecondName = us.SecondName;
            user.PositionId = us.PositionId;
            user.PhoneNumber = us.PhoneNumber;
            user.Email = us.Email;

            if (us.MentorId == null)
            {
                user.MentorId = us.MentorId;
            }
            else
            {
                var mentor = userRepository.GetItems().FirstOrDefault(i => i.Id == us.MentorId);
                if (mentor == null)
                {
                    user.MentorId = us.MentorId;
                }
            }

            string avatar;
            if (model.Avatar != null)
            {
                var format = model.Avatar.FileName.Substring(model.Avatar.FileName.LastIndexOf('.'));
                avatar = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss") + Guid.NewGuid() + format;

                using (var fs = File.Create(PicPath + avatar))
                {
                    await model.Avatar.CopyToAsync(fs);
                }

                var file = PicPath + user.Avatar;
                if (File.Exists(file))
                {
                    File.Delete(file);
                }

                user.Avatar = avatar;
            }

            await this.userManager.UpdateAsync(user);

            if (user.UserName != us.Login)
            {
                await this.userManager.SetUserNameAsync(user, us.Login);
            }

            if (us.Password != string.Empty)
            {
                await this.userManager.RemovePasswordAsync(user);
                await this.userManager.AddPasswordAsync(user, us.Password);
            }


            return new UserInfo(user);
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

        public int AddRecruit(Guid mentorId, Guid userId)
        {
            var mentor = userRepository.GetItems().FirstOrDefault(i => i.Id == mentorId);
            var user = userRepository.GetItems().FirstOrDefault(i => i.Id == userId);

            if (user == null || mentor == null)
            {
                return 0;
            }

            user.MentorId = mentorId;
            userRepository.UpdateUser(user);

            return 1;
        }

        public int DelMentor(Guid userId)
        {
            var user = userRepository.GetItems().FirstOrDefault(i => i.Id == userId);

            if (user == null)
            {
                return 0;
            }

            user.MentorId = null;
            userRepository.UpdateUser(user);

            return 1;
        }

        public List<UserInfo> GetRecruits(Guid userId)
        {
            var user = userRepository.GetItems()
                .Include(i => i.Recruits).ThenInclude(i => i.Position)
                .FirstOrDefault(i => i.Id == userId);

            if (user == null || user.Recruits == null)
            {
                return null;
            }

            return user.Recruits.Select(i => new UserInfo(i)).ToList();
        }

    }
}
