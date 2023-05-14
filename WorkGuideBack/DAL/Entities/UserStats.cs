using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    public class UserStats
    {
        [ForeignKey("User")]
        public Guid Id { get; set; }

        public int PassedTests { get; set; }

        public int PerfectTests { get; set; }

        public int GoodTests { get; set; }

        public int MediumTests { get; set; }

        public int BadTests { get; set; }

        public int TerribleTests { get; set; }

        public int CompletedCourses { get; set; }

        /// <summary>
        /// Кол-во курсов с мин. оценкой за тест в 100%
        /// </summary>
        public int PerfectCourses { get; set; }

        /// <summary>
        /// Кол-во курсов с мин. оценкой за тест от 66 до 99%
        /// </summary>
        public int GoodCourses { get; set; }

        /// <summary>
        /// Кол-во курсов с мин. оценкой за тест от 34 до 66%
        /// </summary>
        public int MediumCourses { get; set; }

        /// <summary>
        /// Кол-во курсов с мин. оценкой за тест от 1 до 33%
        /// </summary>
        public int BadCourses { get; set; }

        /// <summary>
        /// Кол-во курсов с мин. оценкой за тест в 0%
        /// </summary>
        public int TerribleCourses { get; set; }

        public User User { get; set; }
    }
}
