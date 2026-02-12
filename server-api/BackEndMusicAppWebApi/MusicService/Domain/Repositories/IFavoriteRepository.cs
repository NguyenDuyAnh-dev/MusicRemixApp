using MusicService.Domain.Entities;

namespace MusicService.Domain.Repositories
{
    public interface IFavoriteRepository
    {
        Task<List<Song>> GetFavoriteSongsByUserAsync(Guid userId);
        Task<(List<Song> Items, int TotalCount)> GetPagedByUserAsync(Guid userId, int pageNumber, int pageSize);
        Task<int> CountBySongIdAsync(Guid songId);
        Task<bool> ExistsAsync(Guid userId, Guid songId);
        Task AddAsync(Guid userId, Guid songId);
        Task RemoveAsync(Guid userId, Guid songId);
    }
}
