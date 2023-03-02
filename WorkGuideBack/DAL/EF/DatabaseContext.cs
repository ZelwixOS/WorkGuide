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

        public DbSet<Theory> TheoryPages { get; set; }

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

            base.OnModelCreating(modelBuilder);
        }
    }
}
