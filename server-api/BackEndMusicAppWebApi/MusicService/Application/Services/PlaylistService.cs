using AutoMapper;
using MusicService.Application.Dto.Pageds;
using MusicService.Application.Dto.Playlists;
using MusicService.Domain.Entities;
using MusicService.Domain.Repositories;

namespace MusicService.Application.Services
{
    public class PlaylistService : IPlaylistService
    {
        private readonly IPlaylistRepository _repo;
        private readonly IMapper _mapper;

        public PlaylistService(IPlaylistRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<List<PlaylistResponse>> GetMyPlaylistsAsync(Guid userId)
        {
            var playlists = await _repo.GetAllByUserAsync(userId);
            return _mapper.Map<List<PlaylistResponse>>(playlists);
        }

        public async Task<PagedResponse<PlaylistResponse>> GetMyPlaylistsPagedAsync(Guid userId, int pageNumber, int pageSize)
        {
            pageNumber = pageNumber <= 0 ? 1 : pageNumber;
            pageSize = pageSize <= 0 ? 10 : Math.Min(pageSize, 50);

            var (items, totalCount) =
                await _repo.GetAllPagedByUserAsync(userId, pageNumber, pageSize);

            return new PagedResponse<PlaylistResponse>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalElements = totalCount,
                TotalPages = (int)Math.Ceiling(
                    totalCount / (double)pageSize),
                Content = _mapper.Map<List<PlaylistResponse>>(items)
            };
        }


        public async Task<PlaylistResponse?> GetByIdAsync(Guid playlistId)
        {
            var playlist = await _repo.GetByIdAsync(playlistId);
            return playlist == null ? null : _mapper.Map<PlaylistResponse>(playlist);
        }

        public async Task CreateAsync(Guid userId, string name)
        {
            var playlist = new Playlist
            {
                Id = Guid.NewGuid(),
                Name = name,
                UserId = userId
            };

            await _repo.AddAsync(playlist);
        }

        public Task AddSongAsync(Guid playlistId, Guid songId) =>
            _repo.AddSongAsync(playlistId, songId);

        public Task RemoveSongAsync(Guid playlistId, Guid songId) =>
            _repo.RemoveSongAsync(playlistId, songId);

        public Task DeleteAsync(Guid playlistId) =>
            _repo.DeleteAsync(playlistId);
    }
}
