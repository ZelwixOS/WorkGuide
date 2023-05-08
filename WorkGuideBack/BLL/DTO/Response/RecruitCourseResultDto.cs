using DAL.Entities;

namespace BLL.DTO.Response
{
    public class RecruitCourseResultDto
    {
        public RecruitCourseResultDto(List<RecruitLessonResultDto> resultLesson, int total, Course course)
        {
            this.ResultLesson = resultLesson;
            this.CompleteLesson = resultLesson.Count;
            this.Course = course;
            this.Total = total;
        }
        public List<RecruitLessonResultDto> ResultLesson { get; set; }

        public int CompleteLesson { get; set; }

        public int Total { get; set; }

        public Course Course { get; set; }
    }
}
