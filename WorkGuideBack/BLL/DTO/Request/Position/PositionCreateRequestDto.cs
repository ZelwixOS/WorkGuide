using BLL.DTO.Request.Position;

namespace BLL.DTO.Request.Position
{
    public class PositionCreateRequestDto : PositionRequestDto
    {
        public override DAL.Entities.Position ToModel()
        {
            return new DAL.Entities.Position()
            {
                Title = this.Title
            };
        }
    }
}
