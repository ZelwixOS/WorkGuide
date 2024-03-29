﻿namespace BLL.DTO.Request.Test
{
    public class TestUpdateRequestDto : TestRequestDto
    {
        public Guid Id { get; set; }

        public override DAL.Entities.Test ToModel()
        {
            return new DAL.Entities.Test()
            {
                Id = this.Id,
                Content = this.Content,
                PageNumer = this.PageNumer,
                LessonId = this.LessonId,
                IsManyAnswer = this.IsManyAnswer,
                Answers = this.Answers.Select(s => s.ToModel()).ToHashSet(),
            };
        }
    }
}
