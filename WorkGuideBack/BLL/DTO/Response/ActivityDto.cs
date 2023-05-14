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

            if (activity.User != null)
            {
                this.FirstName = activity.User.FirstName;
                this.SecondName = activity.User.SecondName;
                this.Login = activity.User.UserName;
                this.UserPic = activity.User.Avatar;
            }
        }

        public string Title { get; set; }

        public string Content { get; set; }

        public string AdditContent { get; set; }

        public string FirstName { get; set; }

        public string SecondName { get; set; }

        public string Login { get; set; }

        public string UserPic { get; set; }

        public DateTime DateOfCreation { get; set; }

        public Guid Id { get; set; }
    }
}
