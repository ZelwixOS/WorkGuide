using BLL.DTO.Request.Activity;
using BLL.DTO.Response;
using BLL.DTO.Response.Account;
using BLL.Interfaces;
using DAL.Entities;
using DAL.Interfaces;

namespace BLL.Services
{
    public class ActivityService : IActivityService
    {
        private IActivityRepository activityRepository;

        public ActivityService(IActivityRepository activityRepository)
        {
            this.activityRepository = activityRepository;
        }

        public ActivityDto GetActivity(Guid id)
        {
            var activity = this.activityRepository.GetItem(id);
            if (activity != null)
            {
                return new ActivityDto(activity);
            }

            return null;
        }

        public List<ActivityDto> GetActivities(Guid userId, int count)
        {
            var activity = this.activityRepository.GetItems()
                .ToList()
                .Where(i => i.UserId == userId)
                .OrderByDescending(i => i.DateOfCreation)
                .Take(count);

            if (activity == null)
            {
                return null;
            }

            var activitys = new List<ActivityDto>();
            foreach (var act in activity)
            {
                activitys.Add(new ActivityDto(act));
            }

            return activitys;
        }

        public ActivityDto CreateActivity(ActivityCreateRequestDto activity)
        {
            var activityMod = activity.ToModel();
            var res = this.activityRepository.CreateItem(activityMod);

            return new ActivityDto(res);
        }

        public ActivityDto UpdateActivity(ActivityUpdateRequestDto activity)
        {
            var activEntity = this.activityRepository.GetItem(activity.Id);

            if (activEntity == null)
            {
                return null;
            }

            var activityMod = activity.ToModel();
            var activityEntity = this.activityRepository.UpdateItem(activityMod);

            return new ActivityDto(activityEntity);
        }

        public int DeleteActivity(Guid id)
        {
            var activity = this.activityRepository.GetItem(id);
            if (activity != null)
            {
                return this.activityRepository.DeleteItem(activity);
            }
            else
            {
                return 0;
            }
        }
    }
}
