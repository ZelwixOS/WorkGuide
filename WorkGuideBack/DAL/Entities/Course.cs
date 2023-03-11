namespace DAL.Entities
{
    public class Course
    {
        public Guid Id { get; set; }

        public string Url { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string PicUrl { get; set; }

        public bool Published { get; set; }

        public HashSet<Lesson> Lessons { get; set; }

        public HashSet<PositionCourse> PositionCourses { get; set;}

        public HashSet<UserCourse> UserCourses { get; set; }
    }
}
