namespace DAL.Entities
{
    public class Achievement
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string IconUrl { get; set; }

        public string Description { get; set; }

        public AchievementType Type { get; set; }

        public string Parameters { get; set; }

        public Guid? CourseId { get; set; }

        public Course Course { get; set; }

        public HashSet<UserAchievement> UserAchievements { get; set;}
    }
}
