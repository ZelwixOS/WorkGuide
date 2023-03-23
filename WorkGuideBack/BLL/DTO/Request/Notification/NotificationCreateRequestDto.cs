namespace BLL.DTO.Request.Notification
{
    public class NotificationCreateRequestDto : NotificationRequestDto
    {
        public override DAL.Entities.Notification ToModel()
        {
            return new DAL.Entities.Notification()
            {
                Title = this.Title,
                DateOfCreation = this.DateOfCreation
            };
        }
    }
}
