﻿namespace DAL.Entities
{
    public class PositionCourse
    {
        public Guid Id { get; set; }

        public Guid PositionId { get; set; }

        public Guid CourceId { get; set; }

        public Position Position { get; set; }

        public Course Course { get; set; }
    }
}
