using DAL.Entities;

namespace BLL.DTO.Response
{
    public class ActivityDto
    {
        public ActivityDto(Activity activity)
        {
            this.Id = activity.Id;

            this.Title = activity.Title;

            this.DateOfCreation = activity.DateOfCreation;

            this.Content = activity.Content;

            this.AdditContent = activity.AdditContent;
        }

        public string Title { get; set; }

        public string Content { get; set; }

        public string AdditContent { get; set; }

        public DateTime DateOfCreation { get; set; }

        public Guid Id { get; set; }
    }
}
