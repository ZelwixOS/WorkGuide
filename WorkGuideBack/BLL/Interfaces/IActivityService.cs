using BLL.DTO.Request.Activity;
using BLL.DTO.Response;

namespace BLL.Interfaces
{
    public interface IActivityService
    {
        ActivityDto CreateActivity(ActivityCreateRequestDto activity);
        int DeleteActivity(Guid id);
        ActivityDto GetActivity(Guid id);
        List<ActivityDto> GetActivities(Guid userId, int count);
        ActivityDto UpdateActivity(ActivityUpdateRequestDto activity);
    }
}
