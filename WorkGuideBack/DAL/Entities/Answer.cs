namespace DAL.Entities
{
    public class Answer
    {
        public Guid Id { get; set; }

        public string Content { get; set; }

        public bool IsValid { get; set; }

        public Guid TestId { get; set; }

        public Test Test { get; set; }
    }
}
