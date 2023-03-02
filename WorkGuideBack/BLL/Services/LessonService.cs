using BLL.DTO.Request.Lesson;
using BLL.DTO.Response;
using BLL.Interfaces;
using DAL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BLL.Services
{
    public class LessonService : ILessonService
    {
        private const string PicPath = "ClientApp/lessonsContentPics/";

        private ILessonRepository lessonService;

        public LessonService(ILessonRepository lessonRepository)
        {
            this.lessonService = lessonRepository;
        }

        public LessonDto GetLesson(Guid id)
        {
            var lesson = this.lessonService.GetItem(id);
            if (lesson != null)
            {
                return new LessonDto(lesson);
            }

            return null;
        }

        public LessonDto GetLesson(string url, int lessonNumber)
        {
            var lesson = this.lessonService.GetItems().Include(l => l.TheoryPages).FirstOrDefault(l => l.Course.Url == url && l.OrderNumber == lessonNumber);
            if (lesson != null)
            {
                return new LessonDto(lesson);
            }

            return null;
        }

        public LessonDto CreateLesson(LessonCreateRequestDto lesson)
        {
            var les = lesson.ToModel();
            var res = this.lessonService.CreateItem(les);

            return new LessonDto(res);
        }

        public LessonDto PublishService(Guid id)
        {
            var lesson = this.lessonService.GetItem(id);

            if (lesson != null)
            {
                return new LessonDto(this.lessonService.UpdateItem(lesson));
            }

            return null;
        }

        public LessonDto UnpublishService(Guid id)
        {
            var lesson = this.lessonService.GetItem(id);

            if (lesson != null)
            {
                return new LessonDto(this.lessonService.UpdateItem(lesson));
            }

            return null;
        }

        public LessonDto UpdateLesson(LessonUpdateRequestDto lesson)
        {
            var lesEntity = this.lessonService.GetItem(lesson.Id);

            if (lesEntity == null)
            {
                return null;
            }

            var les = lesson.ToModel();
            var lessonEntity = this.lessonService.UpdateItem(les);

            return new LessonDto(lessonEntity);
        }

        public int DeleteLesson(Guid id)
        {
            var lesson = this.lessonService.GetItem(id);
            if (lesson != null)
            {
                return this.lessonService.DeleteItem(lesson);
            }
            else
            {
                return 0;
            }
        }

        public async Task<string> SaveFile(IFormFile picFile)
        {
            string picUrl;
            var format = picFile.FileName.Substring(picFile.FileName.LastIndexOf('.'));
            picUrl = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss") + Guid.NewGuid() + format;

            using (var fs = File.Create(PicPath + picUrl))
            {
                await picFile.CopyToAsync(fs);
            }

            return picUrl;
        }
    }
}
