namespace DAL.Entities
{
    public class Position
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public HashSet<PositionCourse> PositionCources { get; set; }

        public HashSet<User> User { get; set; }
    }
}
