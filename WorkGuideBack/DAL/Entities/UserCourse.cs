namespace DAL.Entities
{
    public class UserCourse
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid CourseId { get; set; }

        public User User { get; set; }

        public Course Course { get; set; }

        public int CompletedTests { get; set; }

        public int TotalTests { get; set; }
    }
}
