namespace DAL.Entities
{
    using Microsoft.AspNetCore.Identity;
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Diagnostics.CodeAnalysis;

    public class User : IdentityUser<Guid>
    {
        [Required]
        [MaxLength(100)]
        [MinLength(1)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string SecondName { get; set; }

        [MaxLength(100)]
        [AllowNull]
        public string? Avatar { get; set; }

        public bool Banned { get; set; }
    }
}
