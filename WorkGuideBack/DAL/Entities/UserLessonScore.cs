namespace DAL.Entities
{
    public class UserLessonScore
    {
        public Guid Id { get; set; }

        public Guid LessonId { get; set; }

        public Guid UserId { get; set; }

        public int RightAnswer { get; set; }

        public int TestsCount { get; set; }

        public Lesson Lesson { get; set; }

        public User User { get; set; }
    }
}
