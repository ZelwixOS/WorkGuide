using BLL.DTO.Request;
using BLL.DTO.Request.Theory;
using BLL.DTO.Response;

namespace BLL.Interfaces
{
    public interface ITheoryService
    {
        Task<TheoryDto> CreateTheoryAsync(TheoryCreateRequestDto theory);
        Task<FileDescriptor> CreateTheoryFile(Guid theoryId, CreateFileRequestDto file);
        int DeleteTheory(Guid id);
        int DeleteTheoryFile(Guid fileId);
        TheoryDto GetTheory(Guid id);
        TheoryDto UpdateTheory(TheoryUpdateRequestDto Theory);
    }
}