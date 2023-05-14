using BLL.DTO.Response.Account;

namespace BLL.DTO.Response
{
    public class RecruitResultDto
    {
        public RecruitResultDto(UserInfo userInfo, List<RecruitCourseResultDto> recruitCourse)
        {
            UserInfo = userInfo;
            RecruitCourse = recruitCourse;
        }

        public UserInfo UserInfo { get; set; }

        public List<RecruitCourseResultDto> RecruitCourse { get; set; }
    }
}
