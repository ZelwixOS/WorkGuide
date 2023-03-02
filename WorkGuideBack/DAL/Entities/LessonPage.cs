﻿namespace DAL.Entities
{
    public class LessonPage
    {
        public Guid Id { get; set; }

        public int PageOrder { get; set; }

        public string Content { get; set; }

        public Guid LessonId { get; set; }

        public Lesson Lesson { get; set; }
    }
}
