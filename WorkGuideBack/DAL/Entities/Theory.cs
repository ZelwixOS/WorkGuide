namespace DAL.Entities
{
    public class Theory : LessonPage
    {
        public HashSet<TheoryFile> TheoryFiles {  get; set; }
    }
}
