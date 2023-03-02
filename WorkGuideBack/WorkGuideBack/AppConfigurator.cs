using DAL.Interfaces;
using DAL.EF;
using Microsoft.EntityFrameworkCore;
using BLL.Interfaces;
using DAL.Repositories;
using BLL.Services;
using DAL.Entities;
using Microsoft.AspNetCore.Identity;
using DAL.Repository;

namespace WorkGuideBack
{
    public static class AppConfigurator
    {
        public static void Configure(WebApplicationBuilder builder)
        {
            IConfiguration configuration = builder.Configuration;
            IWebHostEnvironment environment = builder.Environment;
            IServiceCollection services = builder.Services;

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp";
            });

            string dbconectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            services.AddEntityFrameworkSqlServer().AddDbContext<DatabaseContext>(options => options.UseSqlServer(dbconectionString));

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddIdentity<User, IdentityRole<Guid>>().AddEntityFrameworkStores<DatabaseContext>();
            services.AddScoped<RoleManager<IdentityRole<Guid>>>();
            services.AddScoped<UserManager<User>>();
            services.AddScoped<SignInManager<User>>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IRolesInitializer, RolesInitializer>(provider =>
                new RolesInitializer(provider.GetService<RoleManager<IdentityRole<Guid>>>(), provider.GetService<UserManager<User>>()));

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "WorkGuideCookies";
                options.LoginPath = "/User/Login/";
                options.AccessDeniedPath = "/User/AccessDenied/";
                options.LogoutPath = "/User/Logout/";
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
                options.Events.OnRedirectToAccessDenied = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });

            services.AddSingleton<IDatabaseContextFactory, DatabaseContextFactory>();

            services.AddScoped<ICourseRepository, CourseRepository>(provider =>
                new CourseRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<IUserRepository, UserRepository>(provider =>
                new UserRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<ILessonRepository, LessonRepository>(provider =>
                new LessonRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<ITheoryRepository, TheoryRepository>(provider =>
                new TheoryRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));

            services.AddScoped<ILessonService, LessonService>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<ITheoryService, TheoryService>();
        }
    }
}
