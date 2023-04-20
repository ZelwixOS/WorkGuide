namespace DAL.Entities
{
    public class Activity
    {
        public Guid Id { get; set; }

        public string? Title { get; set; }

        public string? Content { get; set; }

        public string? AdditContent { get; set; }

        public DateTime DateOfCreation { get; set; }

        public Guid UserId { get; set; }

        public User User { get; set; }
    }
}
