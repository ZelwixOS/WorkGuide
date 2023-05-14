namespace BLL.DTO.Response.Account
{
    using System;
    using DAL.Entities;

    public class UserInfo
    {
        public UserInfo(User user, string role) : this(user)
        {
            this.Role = role;
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
            this.MentorId = user.MentorId;

            if (user.Position != null)
            {
                this.Position = user.Position.Title;
                this.PositionId = user.Position.Id;
            }
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

        public string Position { get; set; }

        public Guid PositionId { get; set; }

        public Guid? MentorId { get; set; }
    }
}