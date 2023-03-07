using BLL.DTO.Response.Account;
using DAL.Entities;

namespace BLL.Interfaces
{
    public interface IUserService
    {
        public List<UserInfo> GetUsersInfo(string request, int count);

        public UserInfo GetUserInfo(Guid id);

        public UserInfo UpdatePosition(Guid id, Guid positionId);
    }
}
