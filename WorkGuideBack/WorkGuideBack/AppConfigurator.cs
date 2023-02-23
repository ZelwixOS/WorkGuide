using DAL.Interfaces;
using DAL.EF;
using Microsoft.EntityFrameworkCore;

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
        }
    }
}
