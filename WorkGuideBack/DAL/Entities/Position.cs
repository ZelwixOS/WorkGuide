namespace DAL.Entities
{
    public class Position
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public HashSet<PositionCourse> PositionCourses { get; set; }

        public HashSet<User> Users { get; set; }
    }
}
