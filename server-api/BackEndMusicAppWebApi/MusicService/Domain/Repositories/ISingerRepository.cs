using MusicService.Domain.Entities;

namespace MusicService.Domain.Repositories
{
    public interface ISingerRepository
    {
        Task<List<Singer>> GetAllAsync();
        Task<(List<Singer> Items, int TotalCount)> GetAllPagedAsync(int pageNumber, int pageSize);
        Task<Singer?> GetByIdAsync(Guid id);
        Task AddAsync(Singer singer);
        Task UpdateAsync(Singer singer);
        Task<bool> DeleteAsync(Guid id);
    }
}
