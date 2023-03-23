namespace BLL.DTO.Request.Notification
{
    public class NotificationUpdateRequestDto : NotificationRequestDto
    {
        public Guid Id { get; set; }

        public override DAL.Entities.Notification ToModel()
        {
            return new DAL.Entities.Notification()
            {
                Id = this.Id,
                Title = this.Title,
                DateOfCreation = this.DateOfCreation
            };
        }
    }
}
