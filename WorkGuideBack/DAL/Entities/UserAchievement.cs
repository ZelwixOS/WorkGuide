namespace DAL.Entities
{
    public class UserAchievement
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid AchievementId { get; set; }

        public DateTime ReceivingDate { get; set; }

        public User User { get; set; }

        public Achievement Achievement { get; set; }
    }
}
