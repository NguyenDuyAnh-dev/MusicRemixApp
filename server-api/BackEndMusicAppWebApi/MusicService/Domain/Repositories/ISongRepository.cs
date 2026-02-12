using MusicService.Domain.Entities;

namespace MusicService.Domain.Repositories
{
    public interface ISongRepository
    {
        Task<List<Song>> GetAllAsync();
        Task<(List<Song> Items, int TotalCount)> GetAllPagedAsync(int pageNumber, int pageSize);
        Task<Song?> GetByIdAsync(Guid id);
        Task AddAsync(Song song);
        Task UpdateAsync(Song song);
        Task<bool> DeleteAsync(Guid id);
    }
}
