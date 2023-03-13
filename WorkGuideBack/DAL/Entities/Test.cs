namespace DAL.Entities
{
    public class Test : LessonPage
    {
        public HashSet<Answer> Answers { get; set; }

        public bool CheckNow { get; set; }

        public bool IsManyAnswer { get; set; }

        public HashSet<UserTestAnswer> UsersTestAnswers { get; set; }
    }
}
