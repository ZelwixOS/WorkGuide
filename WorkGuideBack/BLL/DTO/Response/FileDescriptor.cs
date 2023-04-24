using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO.Response
{
    public class FileDescriptor
    {
        public FileDescriptor(Guid id, string url)
        {
            this.Id = id;
            this.Url = url;
            this.Format = url.Substring(url.LastIndexOf('.'));
        }

        public Guid Id { get; set; }

        public string Url { get; set; }

        public string Format { get; set; }
    }
}
