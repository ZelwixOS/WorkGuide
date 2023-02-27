namespace BLL.DTO.Response
{
    public class PaginatedData<T> where T: class
    {
        public PaginatedData(List<T> data, int currentPage, int maxPage)
        { 
            this.Data = data;
            this.CurrentPage = currentPage;
            this.MaxPage = maxPage;
        }

        public List<T> Data { get; set; }


        public int CurrentPage { get; set; }

        public int MaxPage { get; set; }
    }
}
