using Microsoft.AspNetCore.Http;

namespace BLL.DTO.Request
{
    public class PictureRequest
    {
        public IFormFile Picture { get; set; }
    }
}
