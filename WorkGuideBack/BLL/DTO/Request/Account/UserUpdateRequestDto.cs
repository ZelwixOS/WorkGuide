using BLL.DTO.Response.Account;
using BLL.Interfaces;
using DAL.Entities;

namespace BLL.DTO.Request.Account
{
    public class UserUpdateRequestDto : IDtoMapper<User>
    {
        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public User ToModel()
        {
            return new User()
            {
                Email = this.Email,
                PhoneNumber = this.PhoneNumber
            };
        }
    }
}
