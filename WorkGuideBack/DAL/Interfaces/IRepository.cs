namespace DAL.Interfaces
{
    public interface IRepository<T, TKey>
        where T : class
    {
        IQueryable<T> GetItems();

        T GetItem(TKey id);

        T CreateItem(T item);

        T UpdateItem(T item);

        int DeleteItem(T item);
    }
}
