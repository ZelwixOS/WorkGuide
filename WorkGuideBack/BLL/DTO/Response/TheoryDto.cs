﻿using DAL.Entities;

namespace BLL.DTO.Response
{
    public class TheoryDto : LessonPageDto
    {
        public TheoryDto(Theory theory)
        {
            this.Id = theory.Id;
            this.PageNumber = theory.PageNumer;
            this.Content = theory.Content;

            if (theory.Lesson != null)
            {
                this.LessonName = theory.Lesson.Name;
                this.LessonNumber = theory.Lesson.OrderNumber;

                if (theory.Lesson.Course != null)
                {
                    this.CourseUrl = theory.Lesson.Course.Url;
                }
            }

            if (theory.TheoryFiles != null)
            {
                this.Files = new List<FileDescriptor>();
                foreach (var file in theory.TheoryFiles)
                {
                    this.Files.Add(new FileDescriptor(file.Id, file.Url));
                }
            }
        }

        public List<FileDescriptor> Files { get; set; }
    }
}
