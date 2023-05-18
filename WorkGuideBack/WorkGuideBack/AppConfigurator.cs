using DAL.Interfaces;
using DAL.EF;
using Microsoft.EntityFrameworkCore;
using BLL.Interfaces;
using DAL.Repositories;
using BLL.Services;
using DAL.Entities;
using Microsoft.AspNetCore.Identity;
using DAL.Repository;
using Microsoft.Extensions.DependencyInjection;

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
                new RolesInitializer(
                    provider.GetService<RoleManager<IdentityRole<Guid>>>(),
                    provider.GetService<UserManager<User>>(),
                    provider.GetService<IPositionRepository>()));

            services.Configure<IdentityOptions>(options =>
            {
                options.User.RequireUniqueEmail = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;
                options.Password.RequireNonAlphanumeric = false;
            });

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
            services.AddScoped<ITestRepository, TestRepository>(provider =>
                new TestRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<IAnswerRepository, AnswerRepository>(provider =>
                new AnswerRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<IUserLessonScoreRepository, UserLessonScoreRepository>(provider =>
                new UserLessonScoreRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<IUserTestAnswerRepository, UserTestAnswerRepository>(provider =>
                new UserTestAnswerRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<IPositionCourseRepository, PositionCourseRepository>( provider =>
                new PositionCourseRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<IPositionRepository, PositionRepository>(provider =>
                new PositionRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<IUserCourseRepository, UserCourseRepository>(provider =>
                new UserCourseRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<INotificationRepository, NotificationRepository>(provider =>
                new NotificationRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<INotificationUserRepository, NotificationUserRepository>(provider =>
                new NotificationUserRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<IActivityRepository, ActivityRepository>(provider =>
                new ActivityRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<ITheoryFileRepository, TheoryFileRepository>(provider =>
                new TheoryFileRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<IAchievementRepository, AchievementRepository>(provider =>
                new AchievementRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<IUserAchievementRepository, UserAchievementRepository>(provider =>
                new UserAchievementRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<IUserStatsRepository, UserStatsRepository>(provider =>
                new UserStatsRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));

            services.AddScoped<ILessonService, LessonService>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<ILessonService, LessonService>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<IAnswerService, AnswerService>();
            services.AddScoped<ITheoryService, TheoryService>();
            services.AddScoped<IAchievementService, AchievementService>();
            services.AddScoped<ITestService, TestService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPositionService, PositionService>();
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<IActivityService, ActivityService>();
        }
    }
}
