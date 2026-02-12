using MusicService.Application.Dto.Pageds;
using MusicService.Application.Dto.Playlists;
using MusicService.Domain.Entities;

namespace MusicService.Application.Services
{
    public interface IPlaylistService
    {
        Task<List<PlaylistResponse>> GetMyPlaylistsAsync(Guid userId);
        Task<PagedResponse<PlaylistResponse>> GetMyPlaylistsPagedAsync(Guid userId, int pageNumber, int pageSize);
        Task<PlaylistResponse?> GetByIdAsync(Guid playlistId);

        Task CreateAsync(Guid userId, string name);
        Task AddSongAsync(Guid playlistId, Guid songId);
        Task RemoveSongAsync(Guid playlistId, Guid songId);
        Task DeleteAsync(Guid playlistId);
    }
}
