namespace BLL.DTO.Request.Course
{
    public class CourseCreateRequestDto : CourseRequestDto
    {
        public override DAL.Entities.Course ToModel()
        {
            return new DAL.Entities.Course()
            {
                Name = this.Name,
                Description = this.Description,
                Url = this.Url,
                Published = false,
            };
        }
    }
}
