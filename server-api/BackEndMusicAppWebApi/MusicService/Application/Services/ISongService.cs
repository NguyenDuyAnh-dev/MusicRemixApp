using MusicService.Application.Dto.Pageds;
using MusicService.Application.Dto.Songs;
using MusicService.Domain.Entities;

namespace MusicService.Application.Services
{
    public interface ISongService
    {
        Task<List<SongResponse>> GetAllAsync();
        Task<PagedResponse<SongResponse>> GetAllPagedAsync(int pageNumber, int pageSize);
        Task<SongResponse?> GetByIdAsync(Guid id);
        Task<SongResponse> AddAsync(Guid singerId, SongCreateRequest request);
        Task<SongResponse> UpdateAsync(Guid songId, SongUpdaterequest request);
        Task<bool> DeleteAsync(Guid id);
    }
}
