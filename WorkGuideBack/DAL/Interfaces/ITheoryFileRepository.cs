using DAL.Entities;

namespace DAL.Interfaces
{
    public interface ITheoryFileRepository
    {
        TheoryFile CreateItem(TheoryFile theoryFile);
        int DeleteItem(TheoryFile theoryFile);
        TheoryFile GetItem(Guid id);
        IQueryable<TheoryFile> GetItems();
        TheoryFile UpdateItem(TheoryFile theoryFile);
    }
}