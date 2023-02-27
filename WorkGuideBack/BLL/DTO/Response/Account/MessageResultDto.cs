namespace BLL.DTO.Response.Account
{
    using System.Collections.Generic;
    using BLL.Helpers;

    public class MessageResultDto
    {
        public MessageResultDto(string message, List<string> errors, Constants.AnswerCodes code = Constants.AnswerCodes.NoCommand)
        {
            Message = message;
            Errors = errors;
            Code = code;
        }

        public Constants.AnswerCodes Code { get; set; }

        public string Message { get; set; }

        public List<string> Errors { get; set; }
    }
}
