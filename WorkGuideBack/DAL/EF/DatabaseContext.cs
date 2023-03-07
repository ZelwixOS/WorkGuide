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

        public DbSet<PositionCourse> PositionCources { get; set; }

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
                entity.HasOne(c => c.Course).WithMany(p => p.PositionCources).HasForeignKey(c => c.CourceId);
                entity.HasOne(p => p.Position).WithMany(p => p.PositionCources).HasForeignKey(p => p.PositionId);
                entity.HasKey(p => p.Id);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasOne(u => u.Position).WithMany(p => p.User).HasForeignKey(u => u.PositionId);
                entity.HasKey(u => u.Id);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
