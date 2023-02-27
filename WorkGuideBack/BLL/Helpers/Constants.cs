namespace BLL.Helpers
{
    public static class Constants
    {
        public enum AnswerCodes : int
        {
            NoCommand = 0,
            SignedIn = 3,
            GoToGoogleRegistrationPage = 10,
        }

        public static class RoleManager
        {
            public const string Guest = "Guest";

            public const string Admin = "Admin";

            public const string Worker = "Worker";
        }

        public static class AnswerMessage
        {
            public const string LoggedAs = "Вы вошли как: ";

            public const string WrongCreds = "Неверный логин или пароль";

            public const string LoginError = "Не удалось войти в систему";

            public const string LogOutSucceed = "Выполнен выход";

            public const string RegisteredSuccessfully = "Зарегистрирован новый клиент: ";

            public const string RegisteredWorkerSuccessfully = "Зарегистрирован новый работник: ";

            public const string RegisteredUnsuccessfully = "Ошибка. Не удалось зарегистрировать клиент";

            public const string Redirection = "Перенаправление...";
        }
    }
}
