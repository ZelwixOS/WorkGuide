using BLL.DTO.Request.Account;
using BLL.DTO.Response.Account;

namespace BLL.Interfaces
{
    public interface IUserService
    {
        public List<UserInfo> GetUsersInfo(string request, int count);

        public UserInfo GetUserInfo(Guid id);

        public UserInfo UpdatePosition(Guid id, Guid positionId);

        public Task<UserInfo> UpdateUserAsync(UserUpdateRequestDto userInfo, Guid userId);
    }
}
