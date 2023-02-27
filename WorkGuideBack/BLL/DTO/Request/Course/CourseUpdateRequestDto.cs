namespace BLL.DTO.Request.Course
{
    public class CourseUpdateRequestDto : CourseRequestDto
    {
        public Guid Id { get; set; }

        public override DAL.Entities.Course ToModel()
        {
            return new DAL.Entities.Course()
            {
                Id = this.Id,
                Name = this.Name,
                Description = this.Description,
                Url = this.Url,
                Published = false,
            };
        }
    }
}
