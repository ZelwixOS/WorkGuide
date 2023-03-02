namespace DAL.Entities
{
    public class Test : LessonPage
    {
        public HashSet<Answer> Question { get; set; }

        public bool CheckNow { get; set; }
    }
}
