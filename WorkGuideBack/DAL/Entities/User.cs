﻿namespace DAL.Entities
{
    using Microsoft.AspNetCore.Identity;
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Diagnostics.CodeAnalysis;

    public class User : IdentityUser<Guid>
    {
        [Required]
        [MaxLength(100)]
        [MinLength(1)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string SecondName { get; set; }

        [MaxLength(100)]
        [AllowNull]
        public string? Avatar { get; set; }

        public Guid? PositionId { get; set; }

        public bool Banned { get; set; }

        public Guid? MentorId { get; set; }

        public HashSet<UserLessonScore> LessonsScore { get; set; }

        public HashSet<UserTestAnswer> TestsAnswers { get; set; }

        public HashSet<UserCourse> UserCourses { get; set; }

        public HashSet<NotificationUser> NotificationUser { get; set; }

        public HashSet<Activity> Activity { get; set; }

        public HashSet<UserAchievement> UserAchievements { get; set; }

        public Position Position { get; set; }

        public UserStats Stats { get; set; }
        
        public User Mentor { get; set; }

        public HashSet<User> Recruits { get; set; }
    }
}
