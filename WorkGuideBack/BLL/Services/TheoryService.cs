using BLL.DTO.Request.Theory;
using BLL.DTO.Response;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL.Services
{
    public class TheoryService : ITheoryService
    {
        private ITheoryRepository theoryService;

        public TheoryService(ITheoryRepository TheoryRepository)
        {
            this.theoryService = TheoryRepository;
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

        public TheoryDto CreateTheory(TheoryCreateRequestDto Theory)
        {
            var les = Theory.ToModel();
            var res = this.theoryService.CreateItem(les);

            return new TheoryDto(res);
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
            var Theory = this.theoryService.GetItem(id);
            if (Theory != null)
            {
                return this.theoryService.DeleteItem(Theory);
            }
            else
            {
                return 0;
            }
        }
    }
}
