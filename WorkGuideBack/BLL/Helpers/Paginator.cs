namespace BLL.Helpers
{
    using BLL.DTO.Response;
    using System.Collections.Generic;
    using System.Linq;
 
    public static class Paginator<T> where T : class
    {
        public static PaginatedData<T> ElementsOfPage(IQueryable<T> data, int currentPage, int itemsOnPage)
        {
            if (data != null && itemsOnPage > 0)
            {
                int pageTotalNumber = MaxPageCount(data, itemsOnPage);

                if (pageTotalNumber >= currentPage && currentPage > 0)
                {
                    int finish = currentPage * itemsOnPage;
                    var prod = data.Take(finish).Skip(finish - itemsOnPage).ToList();

                    return new PaginatedData<T>(prod, currentPage, pageTotalNumber);
                }
                else
                {
                    return new PaginatedData<T>(new List<T>(), 1, pageTotalNumber);
                }
            }
            else
            {
                return new PaginatedData<T>(new List<T>(), 0, 0);
            }
        }

        public static int MaxPageCount(IQueryable<T> products, int itemsOnPage)
        {
            int prodNum = products.Count();
            int pageTotalNumber = prodNum / itemsOnPage;
            if (prodNum % itemsOnPage > 0)
            {
                pageTotalNumber++;
            }

            return pageTotalNumber;
        }
    }
}
