namespace DAL.Entities
{
    public class Notification
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime DateOfCreation { get; set; }
        
        public HashSet<NotificationUser> NotificationUser { get; set; }
    }
}
