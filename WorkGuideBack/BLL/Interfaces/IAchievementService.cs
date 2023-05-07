﻿using BLL.DTO.Request.Achievement;
using BLL.DTO.Response;

namespace BLL.Interfaces
{
    public interface IAchievementService
    {
        List<AchievementDto> CheckNewAchievements(Guid userId, Guid courseId, bool courseCompleted);
        Task<AchievementDto> CreateAchievementAsync(AchievementCreateRequestDto achievement);
        int DeleteAchievement(Guid id);
        List<AchievementDto> GetAllAchievements(Guid userId, Guid? courseId);
        List<AchievementDto> GetAllAchievements(Guid? courseId);
        List<AchievementDto> GetLastRecieved(Guid userId, int requested);
        Task<AchievementDto> UpdateAchievementAsync(AchievementUpdateRequestDto achievement);
    }
}