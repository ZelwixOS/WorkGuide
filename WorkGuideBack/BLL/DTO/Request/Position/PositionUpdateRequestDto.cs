namespace BLL.DTO.Request.Position
{
    public class PositionUpdateRequestDto : PositionRequestDto
    {
        public Guid Id { get; set; }

        public override DAL.Entities.Position ToModel()
        {
            return new DAL.Entities.Position()
            {
                Id = this.Id,
                Title = this.Title
            };
        }
    }
}
