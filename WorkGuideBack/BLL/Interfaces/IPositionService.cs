using BLL.DTO.Request.Position;
using BLL.DTO.Response;
using DAL.Entities;

namespace BLL.Interfaces
{
    public interface IPositionService
    {
        PositionDto CreatePosition(PositionCreateRequestDto position);
        int DeletePosition(Guid id);
        PositionDto GetPosition(Guid id);
        PositionDto UpdatePosition(PositionUpdateRequestDto position);
    }
}
