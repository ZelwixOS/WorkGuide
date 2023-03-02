using DAL.Entities;

namespace DAL.Interfaces
{
    public interface ITheoryRepository : IRepository<Theory, Guid>
    {
        Theory CreateItem(Theory theory);
        int DeleteItem(Theory theory);
        Theory GetItem(Guid id);
        IQueryable<Theory> GetItems();
        Theory UpdateItem(Theory theory);
    }
}