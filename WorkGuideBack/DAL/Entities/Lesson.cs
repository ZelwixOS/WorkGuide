namespace DAL.Entities
{
    public class Lesson
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public int OrderNumber { get; set; }

        public Guid CourseId { get; set; }

        public Course Course { get; set; }
    }
}
