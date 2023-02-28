﻿namespace DAL.Entities
{
    public class Course
    {
        public Guid Id { get; set; }

        public string Url { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string PicUrl { get; set; }

        public bool Published { get; set; }
    }
}