namespace BLL.DTO.Response
{
    public class FileDescriptor
    {
        public FileDescriptor(Guid id, string url)
        {
            this.Id = id;
            this.Name = url.Substring(url.LastIndexOf('\\') + 1);
            this.Url = url;
            this.Format = url.Substring(url.LastIndexOf('.') + 1);
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public string Format { get; set; }
    }
}
