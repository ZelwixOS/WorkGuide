using Microsoft.AspNetCore.Http;

namespace BLL.DTO.Request
{
    public class CreateFileRequestDto
    {
        public IFormFile File { get; set; }
    }
}
