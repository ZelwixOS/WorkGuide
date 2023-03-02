namespace DAL.Entities
{
    public class Test : LessonPage
    {
        public HashSet<Answer> Answers { get; set; }

        public bool CheckNow { get; set; }
    }
}
