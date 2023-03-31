namespace DAL.Entities
{
    public class NotificationUser
    {
        public Guid Id { get; set; }
        
        public Guid NotificationId { get; set; }

        public Guid UserId { get; set; }

        public bool Read { get; set; }

        public Notification Notification { get; set; }

        public User User { get; set; }
    }
}
