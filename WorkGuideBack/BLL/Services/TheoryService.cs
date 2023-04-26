using BLL.DTO.Request;
using BLL.DTO.Request.Theory;
using BLL.DTO.Response;
using BLL.Interfaces;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Migrations;
using Microsoft.AspNetCore.Http;
using System.Security.Policy;

namespace BLL.Services
{
    public class TheoryService : ITheoryService
    {
        public const string fileFolder = "./ClientApp/lessonsContent/";

        private ITheoryRepository theoryService;

        private ITheoryFileRepository theoryFileRepository;

        public TheoryService(ITheoryRepository TheoryRepository, ITheoryFileRepository theoryFileRepository)
        {
            this.theoryService = TheoryRepository;
            this.theoryFileRepository = theoryFileRepository;
        }

        public TheoryDto GetTheory(Guid id)
        {
            var Theory = this.theoryService.GetItem(id);
            if (Theory != null)
            {
                return new TheoryDto(Theory);
            }

            return null;
        }

        public async Task<TheoryDto> CreateTheoryAsync(TheoryCreateRequestDto theory)
        {
            var les = theory.ToModel();
            string url;
            TheoryFile theoryFile;

            var res = this.theoryService.CreateItem(les);

            if (theory.Files != null)
            {
                foreach (var item in theory.Files)
                {
                    await SaveTheoryFileAsync(item, res.LessonId, res.Id);
                }
            }

            return new TheoryDto(res);
        }

        public async Task<FileDescriptor> CreateTheoryFile(Guid theoryId, CreateFileRequestDto file)
        {
            var theory = this.theoryService.GetItem(theoryId);

            if (theory != null)
            {
                var res = await SaveTheoryFileAsync(file.File, theory.LessonId, theoryId);

                if (res != null)
                {
                    return new FileDescriptor(res.Id, res.Url);
                }
            }

            return null;
        }

        public int DeleteTheoryFile(Guid fileId)
        {
            var file = this.theoryFileRepository.GetItem(fileId);

            if (file != null)
            {
                File.Delete(fileFolder + file.Url);
                
                return this.theoryFileRepository.DeleteItem(file);
            }

            return 0;
        }

        public TheoryDto UpdateTheory(TheoryUpdateRequestDto Theory)
        {
            var lesEntity = this.theoryService.GetItem(Theory.Id);

            if (lesEntity == null)
            {
                return null;
            }

            var les = Theory.ToModel();
            var theoryEntity = this.theoryService.UpdateItem(les);

            return new TheoryDto(theoryEntity);
        }

        public int DeleteTheory(Guid id)
        {
            var theory = this.theoryService.GetItem(id);
            if (theory != null)
            {
                Directory.Delete(fileFolder + theory.LessonId, true);
                return this.theoryService.DeleteItem(theory);
            }

            return 0;
        }

        protected async Task<TheoryFile> SaveTheoryFileAsync(IFormFile item, Guid lessonId, Guid theoryId)
        {
            if (!Directory.Exists(fileFolder + theoryId.ToString()))
            {
                Directory.CreateDirectory(fileFolder + theoryId.ToString());
            }

            var format = item.FileName.Substring(item.FileName.LastIndexOf('.'));

            string url = Path.Combine(theoryId.ToString(), item.FileName);

            using (var fs = File.Create(fileFolder + url))
            {
                await item.CopyToAsync(fs);
            }

            var theoryFile = new TheoryFile()
            {
                TheoryId = theoryId,
                Format = format,
                Url = url,
            };

            // Сохранение информации в репозиторий файлов теории
            return this.theoryFileRepository.CreateItem(theoryFile);
        }
    }
}
