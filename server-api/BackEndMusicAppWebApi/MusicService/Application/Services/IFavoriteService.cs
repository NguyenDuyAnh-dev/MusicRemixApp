using MusicService.Application.Dto.Pageds;
using MusicService.Application.Dto.Songs;
using MusicService.Domain.Entities;

namespace MusicService.Application.Services
{
    public interface IFavoriteService
    {
        Task<List<SongResponse>> GetByUserAsync(Guid userId);
        Task<PagedResponse<SongResponse>> GetAllByUserPagedAsync(Guid userId, int pageNumber, int pageSize);
        Task<int> CountBySongIdAsync(Guid songId);
        Task<bool> AddAsync(Guid userId, Guid songId);
        Task<bool> RemoveAsync(Guid userId, Guid songId);
    }
}
