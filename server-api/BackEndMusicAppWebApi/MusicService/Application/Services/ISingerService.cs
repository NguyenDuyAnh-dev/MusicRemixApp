
using MusicService.Application.Dto.Pageds;
using MusicService.Application.Dto.Singers;
using MusicService.Domain.Entities;

namespace MusicService.Application.Services
{
    public interface ISingerService
    {
        Task<List<SingerResponse>> GetAllAsync();
        Task<PagedResponse<SingerResponse>> GetAllPagedAsync(int pageNumber, int pageSize);

        Task<SingerResponse?> GetByIdAsync(Guid id);
        Task<SingerResponse> AddAsync(SingerCreateRequest singer);
        Task<SingerResponse> UpdateAsync(Guid id, SingerUpdaterequest singer);
        Task<bool> DeleteAsync(Guid id);
    }
}
