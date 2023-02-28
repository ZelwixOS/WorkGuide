namespace BLL.Services
{
    using System;
    using System.Threading.Tasks;
    using BLL.Helpers;
    using BLL.Interfaces;
    using DAL.Entities;
    using Microsoft.AspNetCore.Identity;

    public class RolesInitializer : IRolesInitializer
    {
        private RoleManager<IdentityRole<Guid>> roleManager;

        private UserManager<User> userManager;

        public RolesInitializer(RoleManager<IdentityRole<Guid>> roleManager, UserManager<User> userManager)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
        }

        public async Task CreateUserRoles()
        {
            if (await roleManager.FindByNameAsync(Constants.RoleManager.Admin) == null)
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>(Constants.RoleManager.Admin));
                await CreateUserAsync("adminNE@mail.com", "Admin", "Main", "Administrator", "Aa123456!", "89807350000", Constants.RoleManager.Admin);

            }

            if (await roleManager.FindByNameAsync(Constants.RoleManager.Worker) == null)
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>(Constants.RoleManager.Worker));
                await CreateUserAsync("costomerNE@mail.com", "Sergey", "Prohorov", "TestCustomer", "Aa123456!", "89807350000", Constants.RoleManager.Worker);
            }
        }

        private async Task CreateUserAsync(string email, string firstName, string secondName, string login, string password, string phoneNumber, string role)
        {
            if (await userManager.FindByNameAsync(login) == null)
            {
                User newUser = new User
                {
                    UserName = login,
                    FirstName = firstName,
                    SecondName = secondName,
                    Email = email,
                    PhoneNumber = phoneNumber,
                };
                IdentityResult result = await userManager.CreateAsync(newUser, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(newUser, role);
                }
            }
        }
    }
}
