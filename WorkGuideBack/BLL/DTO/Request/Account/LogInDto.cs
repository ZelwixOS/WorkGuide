namespace BLL.DTO.Request.Account
{
    using System.ComponentModel.DataAnnotations;

    public class LogInDto
    {
        [Required]
        [MaxLength(30)]
        public string Login { get; set; }

        [Required]
        [MaxLength(30)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
