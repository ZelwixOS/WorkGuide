using BLL.DTO.Response.Account;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL.Services
{
    public class UserService : IUserService
    {
        private IUserRepository userRepository;

        public List<UserInfo> GetUsersInfo(string request, int count)
        {
            string[] words = request.Split(' ');

            var users = this.userRepository.GetItems().Where(u => words.Any(u.FirstName.Contains) ||
                                                                  words.Any(u.SecondName.Contains)).
                                                                  Take(count).
                                                                  ToList();

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
    }
}
