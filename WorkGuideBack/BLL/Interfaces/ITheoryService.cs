using BLL.DTO.Request.Theory;
using BLL.DTO.Response;

namespace BLL.Interfaces
{
    public interface ITheoryService
    {
        TheoryDto CreateTheory(TheoryCreateRequestDto Theory);
        int DeleteTheory(Guid id);
        TheoryDto GetTheory(Guid id);
        TheoryDto UpdateTheory(TheoryUpdateRequestDto Theory);
    }
}