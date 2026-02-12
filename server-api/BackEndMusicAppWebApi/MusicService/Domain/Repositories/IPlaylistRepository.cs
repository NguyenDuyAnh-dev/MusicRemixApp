using MusicService.Application.Dto.Playlists;
using MusicService.Domain.Entities;

namespace MusicService.Domain.Repositories
{
    public interface IPlaylistRepository
    {
        Task<List<Playlist>> GetAllByUserAsync(Guid userId);
        Task<(List<Playlist> Items, int TotalCount)> GetAllPagedByUserAsync(Guid userId, int pageNumber, int pageSize);
        Task<Playlist?> GetByIdAsync(Guid playlistId);

        Task AddAsync(Playlist playlist);
        Task AddSongAsync(Guid playlistId, Guid songId);
        Task RemoveSongAsync(Guid playlistId, Guid songId);
        Task DeleteAsync(Guid playlistId);
    }
}
