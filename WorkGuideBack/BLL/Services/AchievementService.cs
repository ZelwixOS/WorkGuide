using BLL.DTO.Request.Achievement;
using BLL.DTO.Response;
using BLL.Helpers;
using BLL.Interfaces;
using BLL.Models.Achievements;
using DAL.Entities;
using DAL.Interfaces;
using System.Linq;
using static BLL.Helpers.Constants;
using static System.Formats.Asn1.AsnWriter;

namespace BLL.Services
{
    public class AchievementService : IAchievementService
    {
        private const string PicPath = "ClientApp/achIcons/";

        private IAchievementRepository achievementRepository;
        private IUserAchievementRepository userAchievementRepository;
        private IUserStatsRepository userStatsRepository;
        private IUserLessonScoreRepository userLessonScoreRepository;

        public AchievementService(
            IAchievementRepository achievementRepository,
            IUserAchievementRepository userAchievementRepository,
            IUserStatsRepository userStatsRepository,
            IUserLessonScoreRepository userLessonScoreRepository)
        {
            this.achievementRepository = achievementRepository;
            this.userAchievementRepository = userAchievementRepository;
            this.userStatsRepository = userStatsRepository;
            this.userLessonScoreRepository = userLessonScoreRepository;
        }

        public List<AchievementDto> GetAllAchievements(Guid? courseId)
        {
            return this.achievementRepository.GetItems().Where(a => a.CourseId == courseId).Select(a => new AchievementDto(a)).ToList();
        }

        public AchievementTechnicalInfoDto GetAchievement(Guid id)
        {
            return new AchievementTechnicalInfoDto(this.achievementRepository.GetItem(id));
        }

        public List<AchievementDto> GetAllAchievements(Guid userId, Guid? courseId, int? count)
        {
            var userAchs = this.userAchievementRepository.GetItems().Where(ua => ua.Achievement.CourseId == courseId).ToList();
            var all = this.achievementRepository.GetItems().Where(a => a.CourseId == courseId).ToList();

            var preres = from a in all
                         join r in userAchs on a.Id equals r.AchievementId into achs
                         from uAch in achs.DefaultIfEmpty()
                         select new AchievementDto(a, uAch != null, uAch?.ReceivingDate);

            var res = preres.ToList();

            if (count.HasValue && count > 0)
            {
                res = res.Take(count.Value).ToList();
            }

            return res;
        }

        public List<AchievementDto> GetLastRecieved(Guid userId, int requested)
        {
            List<Achievement> achievements = new List<Achievement>();

            var recieved = this.userAchievementRepository.GetItems().Where(ua => ua.UserId == userId).OrderBy(ua => ua.ReceivingDate);

            var recievedCount = recieved.Count();
            if (requested != 0 && recievedCount > requested)
            {
                return recieved.Take(requested).Select(ua => new AchievementDto(ua.Achievement, true, ua.ReceivingDate)).ToList();
            }

            var allGlobal = this.achievementRepository.GetItems().Where(a => a.CourseId == null);

            var recievedList = recieved.Select(ua => new AchievementDto(ua.Achievement, true, ua.ReceivingDate)).ToList();
            var recievedIds = recievedList.Select(r => r.Id).ToList();

            var united = recievedList.Union(allGlobal.Where(g => !recievedIds.Contains(g.Id)).Select(d => new AchievementDto(d, false, null)));

            if (requested == 0)
            {
                return united.ToList();
            }
            else
            {
                return united.Take(requested).ToList();
            }
        }

        public async Task<AchievementDto> CreateAchievementAsync(AchievementCreateRequestDto achievement)
        {
            var ach = achievement.ToModel();

            if (achievement.PicFile != null)
            {
                var format = achievement.PicFile.FileName.Substring(achievement.PicFile.FileName.LastIndexOf('.'));
                ach.IconUrl = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss") + Guid.NewGuid() + format;

                using (var fs = File.Create(PicPath + ach.IconUrl))
                {
                    await achievement.PicFile.CopyToAsync(fs);
                }
            }
            else
            {
                ach.IconUrl = string.Empty;
            }

            var res = this.achievementRepository.CreateItem(ach);

            return new AchievementDto(res);
        }

        public async Task<AchievementDto> UpdateAchievementAsync(AchievementUpdateRequestDto achievement)
        {
            var achEntity = this.achievementRepository.GetItems().FirstOrDefault(c => c.Id == achievement.Id);

            if (achEntity == null)
            {
                return null;
            }

            var cour = achievement.ToModel();
            cour.IconUrl = achEntity.IconUrl;

            if (achievement.PicFile != null)
            {
                var format = achievement.PicFile.FileName.Substring(achievement.PicFile.FileName.LastIndexOf('.'));
                cour.IconUrl = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss") + Guid.NewGuid() + format;

                using (var fs = File.Create(PicPath + cour.IconUrl))
                {
                    await achievement.PicFile.CopyToAsync(fs);
                }

                var file = PicPath + achEntity.IconUrl;
                if (File.Exists(file))
                {
                    File.Delete(file);
                }
            }

            achEntity = null;
            var achievementEntity = achievementRepository.UpdateItem(cour);

            return new AchievementDto(achievementEntity);
        }

        public List<AchievementDto> CheckNewAchievements(Guid userId, Guid courseId, bool courseCompleted)
        {
            var res = new List<AchievementDto>();

            var userAchievements = this.userAchievementRepository.GetItems().Where(ua => ua.UserId == userId);

            var courseUserAchivements = userAchievements.Where(ua => ua.Achievement.CourseId == courseId).Select(ua => ua.AchievementId).ToList();
            var globalUserAchivements = userAchievements.Where(ua => ua.Achievement.CourseId == null).Select(ua => ua.AchievementId).ToList();

            var courseAchievements = this.achievementRepository.GetItems().Where(a => a.CourseId == courseId && !courseUserAchivements.Contains(a.Id));
            var globalAchievements = this.achievementRepository.GetItems().Where(a => a.CourseId == null && !globalUserAchivements.Contains(a.Id));

            var courseAchievementsTests = courseAchievements.Where(ca => ca.Type == AchievementType.CompletedTests).Select(ca => (CompletedTestsAchievement)ca.ToModel()).ToList();
            var globalAchievementsTests = globalAchievements.Where(ca => ca.Type == AchievementType.CompletedTests).Select(ca => (CompletedTestsAchievement)ca.ToModel()).ToList();

            var userStats = this.userStatsRepository.GetItem(userId);
            
            ProcessCompletedCourseTestsAchievements(courseAchievementsTests, userId, courseId, ref res); // Ачивки за прохождение определённого количества тестов конкретного курса на оценку
            if (userStats != null)
            {
                ProcessCompletedGlobalTestsAchievements(globalAchievementsTests, userStats, ref res); // Ачивки за прохождение определённого количества тестов всего
            }


            if (courseCompleted)
            {
                var courseAchievementsCourse = courseAchievements.Where(ca => ca.Type == AchievementType.CompletedCourse).Select(ca => (CompletedCourseAchievement)ca.ToModel()).ToList();
                var globalAchievementsCourses = globalAchievements.Where(ca => ca.Type == AchievementType.CompletedCourses).Select(ca => (CompletedCoursesAchievement)ca.ToModel()).ToList();
                var minCourseLessonScore = this.userLessonScoreRepository.GetItems().Where(s => s.Lesson.CourseId == courseId).Select(s => (float)s.RightAnswer / s.TestsCount).Min();
                ProcessCompletedCourseAchievements(minCourseLessonScore, courseAchievementsCourse, userId, ref res); // Ачивки за прохождение конкретного курса на оценку
                if (userStats != null)
                {
                    ProcessCompletedCoursesAchievements(globalAchievementsCourses, userStats, ref res); // Ачивки за прохождение определённого количества курсов на оценку
                }
            }

            return res;
        }

        public int DeleteAchievement(Guid id)
        {
            var achievement = this.achievementRepository.GetItem(id);

            if (achievement != null)
            {
                return this.achievementRepository.DeleteItem(achievement);
            }

            return 0;
        }

        protected void ProcessCompletedCourseAchievements(float minCourseLessonScore, List<CompletedCourseAchievement> completedCourse, Guid userId, ref List<AchievementDto> achs)
        {
            CompletedCourseAchievement terr = completedCourse.FirstOrDefault(a => a.TestScore == TestScore.Terrible);
            CompletedCourseAchievement bad = completedCourse.FirstOrDefault(a => a.TestScore == TestScore.Bad);
            CompletedCourseAchievement med = completedCourse.FirstOrDefault(a => a.TestScore == TestScore.Medium);
            CompletedCourseAchievement good = completedCourse.FirstOrDefault(a => a.TestScore == TestScore.Good);
            CompletedCourseAchievement perf = completedCourse.FirstOrDefault(a => a.TestScore == TestScore.Perfect);
            CompletedCourseAchievement any = completedCourse.FirstOrDefault(a => a.TestScore == TestScore.Any);

            var achievement = new UserAchievement()
            {
                UserId = userId,
                ReceivingDate = DateTime.Now,
            };

            if (any != null)
            {
                achievement.AchievementId = any.Id;
                this.userAchievementRepository.CreateItem(achievement);
                achs.Add(new AchievementDto(any, true, achievement.ReceivingDate));
            }

            if (minCourseLessonScore == 0 && terr != null)
            {
                achievement.AchievementId = terr.Id;
                this.userAchievementRepository.CreateItem(achievement);
                achs.Add(new AchievementDto(terr, true, achievement.ReceivingDate));
            }

            if (minCourseLessonScore < 0.33 && bad != null)
            {
                achievement.AchievementId = bad.Id;
                this.userAchievementRepository.CreateItem(achievement);
                achs.Add(new AchievementDto(bad, true, achievement.ReceivingDate));
            }

            if (minCourseLessonScore < 0.66 && med != null)
            {
                achievement.AchievementId = med.Id;
                this.userAchievementRepository.CreateItem(achievement);
                achs.Add(new AchievementDto(med, true, achievement.ReceivingDate));
            }

            if (minCourseLessonScore < 1 && good != null)
            {
                achievement.AchievementId = good.Id;
                this.userAchievementRepository.CreateItem(achievement);
                achs.Add(new AchievementDto(good, true, achievement.ReceivingDate));
            }

            if (minCourseLessonScore == 1 && perf != null)
            {
                achievement.AchievementId = perf.Id;
                this.userAchievementRepository.CreateItem(achievement);
                achs.Add(new AchievementDto(perf, true, achievement.ReceivingDate));
            }
        }

        protected void ProcessCompletedCourseTestsAchievements(List<CompletedTestsAchievement> completedTestsAchs, Guid userId, Guid courseId, ref List<AchievementDto> achs)
        {

            var scores = this.userLessonScoreRepository.GetItems().Where(ls => ls.UserId == userId && ls.Lesson.CourseId == courseId).Select(ls => (float)ls.RightAnswer / ls.TestsCount).ToList();
            int terrC = scores.Where(s => s == 0).Count();
            int badC = scores.Where(s => s > 0).Count();
            int medC = scores.Where(s => s >= 0.33).Count();
            int goodC = scores.Where(s => s >= 0.66).Count();
            int perfC = scores.Where(s => s == 1).Count();
            int anyC = scores.Count;

            var userAch = new UserAchievement()
            {
                UserId = userId,
                ReceivingDate = DateTime.Now,
            };

            foreach (var achievement in completedTestsAchs)
            {
                switch (achievement.TestScore)
                {
                    case TestScore.Any:
                        if (achievement.TestsCount <= anyC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Terrible:
                        if (achievement.TestsCount <= terrC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Bad:
                        if (achievement.TestsCount <= badC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Medium:
                        if (achievement.TestsCount <= medC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Good:
                        if (achievement.TestsCount <= terrC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Perfect:
                        if (achievement.TestsCount <= perfC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                }
            }
        }

        protected void ProcessCompletedCoursesAchievements(List<CompletedCoursesAchievement> completedCourseAchs, UserStats userStats, ref List<AchievementDto> achs)
        {
            int terrC = userStats.TerribleCourses;
            int badC = userStats.BadCourses + userStats.MediumCourses + userStats.GoodCourses + userStats.PerfectCourses;
            int medC = userStats.MediumCourses + userStats.GoodCourses + userStats.PerfectCourses;
            int goodC = userStats.GoodCourses + userStats.PerfectCourses;
            int perfC = userStats.PerfectCourses;
            int anyC = userStats.CompletedCourses;

            var userAch = new UserAchievement()
            {
                UserId = userStats.Id,
                ReceivingDate = DateTime.Now,
            };

            foreach (var achievement in completedCourseAchs)
            {
                switch (achievement.TestScore)
                {
                    case TestScore.Any:
                        if (achievement.CoursesCount <= anyC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Terrible:
                        if (achievement.CoursesCount <= terrC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Bad:
                        if (achievement.CoursesCount <= badC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Medium:
                        if (achievement.CoursesCount <= medC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Good:
                        if (achievement.CoursesCount <= terrC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Perfect:
                        if (achievement.CoursesCount <= perfC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                }
            }
        }

        protected void ProcessCompletedGlobalTestsAchievements(List<CompletedTestsAchievement> completedTestsAchs, UserStats userStats, ref List<AchievementDto> achs)
        {
            int terrC = userStats.TerribleTests;
            int badC = userStats.BadTests + userStats.MediumTests + userStats.GoodTests + userStats.PerfectTests;
            int medC = userStats.MediumTests + userStats.GoodTests + userStats.PerfectTests;
            int goodC = userStats.GoodTests + userStats.PerfectTests;
            int perfC = userStats.PerfectTests;
            int anyC = userStats.PassedTests;

            var userAch = new UserAchievement()
            {
                UserId = userStats.Id,
                ReceivingDate = DateTime.Now,
            };

            foreach (var achievement in completedTestsAchs)
            {
                switch (achievement.TestScore)
                {
                    case TestScore.Any:
                        if (achievement.TestsCount <= anyC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Terrible:
                        if (achievement.TestsCount <= terrC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Bad:
                        if (achievement.TestsCount <= badC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Medium:
                        if (achievement.TestsCount <= medC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Good:
                        if (achievement.TestsCount <= terrC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                    case TestScore.Perfect:
                        if (achievement.TestsCount <= perfC)
                        {
                            userAch.AchievementId = achievement.Id;
                            this.userAchievementRepository.CreateItem(userAch);
                            achs.Add(new AchievementDto(achievement, true, userAch.ReceivingDate));
                        }
                        break;
                }
            }
        }
    }
}
