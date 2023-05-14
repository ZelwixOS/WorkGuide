namespace BLL.DTO.Request.Account
{
    using Microsoft.AspNetCore.Http;
    using System.ComponentModel.DataAnnotations;

    public class WorkerRegistrationDto
    {
        [MaxLength(30)]
        public string Login { get; set; }

        [MaxLength(30)]
        public string Password { get; set; }

        [MaxLength(50)]
        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        [MaxLength(100)]
        [MinLength(1)]
        public string FirstName { get; set; }

        [MaxLength(100)]
        [MinLength(1)]
        public string SecondName { get; set; }

        public IFormFile? Avatar { get; set; }

        public Guid PositionId { get; set; }

        public Guid? MentorId { get; set; }
    }
}
