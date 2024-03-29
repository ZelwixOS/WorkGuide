﻿using BLL.DTO.Request.Lesson;
using BLL.DTO.Response;
using Microsoft.AspNetCore.Http;

namespace BLL.Interfaces
{
    public interface ILessonService
    {
        List<LessonDto> GetLessons();
        LessonDto CreateLesson(LessonCreateRequestDto lesson);
        int DeleteLesson(Guid id);
        LessonDto GetLesson(Guid id);
        LessonDto GetLesson(string courseUrl, int number);
        Task<string> SaveFile(IFormFile picFile);
        LessonDto UpdateLesson(LessonUpdateRequestDto lesson);

    }
}
