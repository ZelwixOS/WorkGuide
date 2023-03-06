using BLL.DTO.Response.Account;

namespace BLL.Interfaces
{
    public interface IUserService
    {
        public List<UserInfo> GetUsersInfo(string request, int count);

        public UserInfo GetUserInfo(Guid id);
    }
}
