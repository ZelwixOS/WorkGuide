﻿namespace BLL.DTO.Response.Account
{
    using System;
    using DAL.Entities;

    public class UserInfo
    {
        public UserInfo(User user, string role)
        {
            this.UserName = user.UserName;
            this.FirstName = user.FirstName;
            this.SecondName = user.SecondName;
            this.Role = role;
            this.PhoneNumber = user.PhoneNumber;
            this.Email = user.Email;
            this.Avatar = user.Avatar;
        }

        public UserInfo(User user)
        {
            this.Id = user.Id;
            this.UserName = user.UserName;
            this.FirstName = user.FirstName;
            this.SecondName = user.SecondName;
            this.PhoneNumber = user.PhoneNumber;
            this.Email = user.Email;
            this.Avatar = user.Avatar;
            this.Banned = user.Banned;
        }

        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string SecondName { get; set; }

        public string Role { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Avatar { get; set; }

        public bool Banned { get; set; }
    }
}