using BLL.Interfaces;

namespace BLL.DTO.Request.Position
{
    public abstract class PositionRequestDto : IDtoMapper<DAL.Entities.Position>
    {
        public string Title { get; set; }

        public abstract DAL.Entities.Position ToModel();
    }
}
