using DAL.Entities;

namespace BLL.DTO.Response
{
    public class PositionDto
    {
        public PositionDto(Position position)
        {
            this.Id = position.Id;

            this.Title = position.Title;
        }

        public string Title { get; set; }

        public Guid Id { get; set; }
    }
}
