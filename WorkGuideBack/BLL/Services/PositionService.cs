using BLL.DTO.Request.Answer;
using BLL.DTO.Request.Position;
using BLL.DTO.Response;
using BLL.Interfaces;
using DAL.Entities;
using DAL.Interfaces;

namespace BLL.Services
{
    public class PositionService : IPositionService
    {
        private IPositionRepository positionRepository;

        public PositionService(IPositionRepository positionRepository)
        {
            this.positionRepository = positionRepository;
        }

        public PositionDto GetPosition(Guid id)
        {
            var position = this.positionRepository.GetItem(id);
            if (position != null)
            {
                return new PositionDto(position);
            }

            return null;
        }

        public PositionDto CreatePosition(PositionCreateRequestDto answer)
        {
            var positionMod = answer.ToModel();
            var res = this.positionRepository.CreateItem(positionMod);

            return new PositionDto(res);
        }

        public PositionDto UpdatePosition(PositionUpdateRequestDto position)
        {
            var posEntity = this.positionRepository.GetItem(position.Id);

            if (posEntity == null)
            {
                return null;
            }

            var positionMod = position.ToModel();
            var positionEntity = this.positionRepository.UpdateItem(positionMod);

            return new PositionDto(positionEntity);
        }

        public int DeletePosition(Guid id)
        {
            var position = this.positionRepository.GetItem(id);
            if (position != null)
            {
                return this.positionRepository.DeleteItem(position);
            }
            else
            {
                return 0;
            }
        }
    }
}
