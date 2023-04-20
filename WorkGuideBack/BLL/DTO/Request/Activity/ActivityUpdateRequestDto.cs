namespace BLL.DTO.Request.Activity
{
    public class ActivityUpdateRequestDto : ActivityRequestDto
    {
        public Guid Id { get; set; }

        public override DAL.Entities.Activity ToModel()
        {
            return new DAL.Entities.Activity()
            {
                Title = this.Title,
                DateOfCreation = this.DateOfCreation,
                Content = this.Content,
                AdditContent = this.AdditContent,
                UserId = this.UserId
            };
        }
    }
}
