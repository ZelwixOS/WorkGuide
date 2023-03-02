namespace DAL.Entities
{
    public class UserTestAnswer
    {
        public Guid Id { get; set; }

        public Guid TestId { get; set; }

        public Guid UserId { get; set; }

        public bool CorrectAnswer { get; set; }

        public Test Test { get; set; }

        public User User { get; set; }
    }
}
