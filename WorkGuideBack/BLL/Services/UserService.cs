using BLL.DTO.Request.Account;
using BLL.DTO.Response;
using BLL.DTO.Response.Account;
using BLL.Interfaces;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace BLL.Services
{
    public class UserService : IUserService
    {
        private IUserRepository userRepository;
        private IPositionRepository positionRepository;
        private UserManager<User> userManager;

        public UserService(IUserRepository userRepository, IPositionRepository positionRepository, UserManager<User> userManager)
        {
            this.userRepository = userRepository;
            this.positionRepository = positionRepository;
            this.userManager = userManager;
        }

        public List<UserInfo> GetUsersInfo(string request, int count)
        {
            string[] words = request.Split(' ');

            for (int i = 0; i < words.Length; i++)
            {
                words[i] = words[i].ToLower();
            }

            var users = this.userRepository.GetItems()
                .ToList()
                .Where(u => words.Any(u.FirstName.ToLower().Contains) || words.Any(u.SecondName.ToLower().Contains) ||
                            words.Any(u.PhoneNumber.ToLower().Contains) || words.Any(u.Email.ToLower().Contains))
                .Take(count);

            if (users == null)
            {
                return null;
            }

            var usersInfo = new List<UserInfo>();
            foreach (var user in users)
            {
                usersInfo.Add(new UserInfo(user));
            }

            return usersInfo;
        }

        public UserInfo GetUserInfo(Guid id)
        {
            var user = this.userRepository.GetItem(id);
            if (user == null)
            {
                return null;
            }

            return new UserInfo(user);
        }

        public UserInfo UpdatePosition(Guid id, Guid positionId)
        {
            var user = this.userRepository.GetItem(id);
            var position = this.positionRepository.GetItem(positionId);

            if (user == null || position == null)
            {
                return null;
            }

            user.PositionId = position.Id;
            user.Position = position;

            return new UserInfo(this.userRepository.UpdateUser(user));
        }

        public async Task<UserInfo> UpdateUserAsync(UserUpdateRequestDto userInfo, Guid userId)
        {
            var usEntity = this.userRepository.GetItem(userId);

            if (usEntity == null)
            {
                return null;
            }

            var us = userInfo.ToModel();
            us.Position = usEntity.Position;
            us.PositionId = usEntity.PositionId;
            us.Avatar = usEntity.Avatar;
            us.Banned = usEntity.Banned;
            us.FirstName = usEntity.FirstName;
            us.LessonsScore = usEntity.LessonsScore;
            us.SecondName = usEntity.SecondName;
            us.TestsAnswers = usEntity.TestsAnswers;
            us.AccessFailedCount = usEntity.AccessFailedCount;
            us.ConcurrencyStamp = usEntity.ConcurrencyStamp;
            us.EmailConfirmed = usEntity.EmailConfirmed;
            us.Id = usEntity.Id;
            us.LockoutEnabled = usEntity.LockoutEnabled;
            us.LockoutEnd = usEntity.LockoutEnd;
            us.NormalizedEmail = usEntity.NormalizedEmail;
            us.NormalizedUserName = usEntity.NormalizedUserName;
            us.PasswordHash = usEntity.PasswordHash;
            us.PhoneNumberConfirmed = usEntity.PhoneNumberConfirmed;
            us.UserName = usEntity.UserName;
            us.SecurityStamp = usEntity.SecurityStamp;
            us.TwoFactorEnabled = usEntity.TwoFactorEnabled;


            var res = await this.userManager.UpdateAsync(us);
            
            return res.Succeeded ? new UserInfo(us) : null;
        }
    }
}
