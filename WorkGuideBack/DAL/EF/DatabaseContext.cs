using Microsoft.EntityFrameworkCore;
using DAL.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace DAL.EF
{
    public class DatabaseContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
                 : base(options)
        {
        }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Lesson> Lessons { get; set; }

        public DbSet<Test> Tests { get; set; }

        public DbSet<Answer> Question { get; set; }

        public DbSet<Theory> TheoryPages { get; set; }

        public DbSet<UserTestAnswer> UserTestAnswers { get; set; }

        public DbSet<UserLessonScore> UserLessonScores { get; set; }

        public DbSet<Position> Positions { get; set; }

        public DbSet<PositionCourse> PositionCourses { get; set; }

        public DbSet<UserCourse> UserCourses { get; set; }

        public DbSet<Notification> Notifications { get; set; }

        public DbSet<NotificationUser> NotificationUsers { get; set; }

        public DbSet<Activity> Activitys { get; set; }

        public DbSet<TheoryFile> TheoryFiles { get; set; }

        public DbSet<UserStats> UsersStats { get; set; }

        public DbSet<Achievement> Achievements { get; set; }

        public DbSet<UserAchievement> UserAchievements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Lesson>(entity =>
            {
                entity.HasOne(l => l.Course).WithMany(c => c.Lessons).HasForeignKey(l => l.CourseId);
                entity.HasKey(l => l.Id);
            });

            modelBuilder.Entity<Theory>(entity =>
            {
                entity.HasOne(t => t.Lesson).WithMany(l => l.TheoryPages).HasForeignKey(t => t.LessonId);
                entity.HasKey(t => t.Id);
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.HasOne(t => t.Lesson).WithMany(q => q.TestPages).HasForeignKey(t => t.LessonId);
                entity.HasKey(q => q.Id);
            });

            modelBuilder.Entity<Answer>(entity =>
            {
                entity.HasOne(t => t.Test).WithMany(q => q.Answers).HasForeignKey(t => t.TestId);
                entity.HasKey(q => q.Id);
            });

            modelBuilder.Entity<UserLessonScore>(entity =>
            {
                entity.HasOne(u => u.Lesson).WithMany(q => q.UsersLessonScores).HasForeignKey(t => t.LessonId);
                entity.HasOne(u => u.User).WithMany(q => q.LessonsScore).HasForeignKey(t => t.UserId);
                entity.HasKey(q => q.Id);
            });

            modelBuilder.Entity<UserTestAnswer>(entity =>
            {
                entity.HasOne(u => u.Test).WithMany(q => q.UsersTestAnswers).HasForeignKey(t => t.TestId);
                entity.HasOne(u => u.User).WithMany(q => q.TestsAnswers).HasForeignKey(t => t.UserId);
                entity.HasKey(q => q.Id);
            });

            modelBuilder.Entity<PositionCourse>(entity =>
            {
                entity.HasOne(c => c.Course).WithMany(p => p.PositionCourses).HasForeignKey(c => c.CourseId);
                entity.HasOne(p => p.Position).WithMany(p => p.PositionCourses).HasForeignKey(p => p.PositionId);
                entity.HasKey(p => p.Id);
            });

            modelBuilder.Entity<Position>(entity =>
            {
                entity.HasMany(p => p.Users).WithOne(u => u.Position).HasForeignKey(u => u.PositionId);
                entity.HasKey(p => p.Id);
            });

            modelBuilder.Entity<UserCourse>(entity =>
            {
                entity.HasOne(c => c.Course).WithMany(p => p.UserCourses).HasForeignKey(c => c.CourseId);
                entity.HasOne(p => p.User).WithMany(p => p.UserCourses).HasForeignKey(p => p.UserId);
                entity.HasKey(p => p.Id);
            });

            modelBuilder.Entity<NotificationUser>(entity =>
            {
                entity.HasOne(c => c.User).WithMany(p => p.NotificationUser).HasForeignKey(c => c.UserId);
                entity.HasOne(p => p.Notification).WithMany(p => p.NotificationUser).HasForeignKey(p => p.NotificationId);
                entity.HasKey(p => p.Id);
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasMany(p => p.NotificationUser).WithOne(u => u.Notification).HasForeignKey(u => u.NotificationId);
                entity.HasKey(p => p.Id);
            });

            modelBuilder.Entity<Activity>(entity =>
            {
                entity.HasOne(t => t.User).WithMany(q => q.Activity).HasForeignKey(t => t.UserId);
                entity.HasKey(q => q.Id);
            });

            modelBuilder.Entity<TheoryFile>(entity =>
            {
                entity.HasOne(t => t.Theory).WithMany(q => q.TheoryFiles).HasForeignKey(t => t.TheoryId);
                entity.HasKey(q => q.Id);
            });

            modelBuilder.Entity<Achievement>(entity =>
            {
                entity.HasOne(a => a.Course).WithMany(c => c.Achievements).HasForeignKey(a => a.CourseId).IsRequired(false);
                entity.HasKey(a => a.Id);
            });

            modelBuilder.Entity<UserAchievement>(entity =>
            {
                entity.HasOne(ua => ua.User).WithMany(u => u.UserAchievements).HasForeignKey(ua => ua.UserId);
                entity.HasOne(ua => ua.Achievement).WithMany(a => a.UserAchievements).HasForeignKey(ua => ua.AchievementId);
                entity.HasKey(ua => ua.Id);
            });

            modelBuilder.Entity<UserStats>(entity =>
            {
                entity.HasOne(us => us.User).WithOne(u => u.Stats);
                entity.HasKey(us => us.Id);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
