using AutoMapper;
using MusicService.Application.Dto.Pageds;
using MusicService.Application.Dto.Songs;
using MusicService.Domain.Entities;
using MusicService.Domain.Repositories;

namespace MusicService.Application.Services
{
    public class FavoriteService : IFavoriteService
    {
        private readonly IFavoriteRepository _repo;
        private readonly IMapper _mapper;

        public FavoriteService(IFavoriteRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<List<SongResponse>> GetByUserAsync(Guid userId)
        {
            var songs = await _repo.GetFavoriteSongsByUserAsync(userId);
            var results = _mapper.Map<List<SongResponse>>(songs);
            return results;
        }

        public async Task<PagedResponse<SongResponse>> GetAllByUserPagedAsync(Guid userId, int pageNumber, int pageSize)
        {
            pageNumber = pageNumber <= 0 ? 1 : pageNumber;
            pageSize = pageSize <= 0 ? 10 : Math.Min(pageSize, 50);

            var (items, totalCount) =
                await _repo.GetPagedByUserAsync(userId, pageNumber, pageSize);

            return new PagedResponse<SongResponse>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalElements = totalCount,
                TotalPages = (int)Math.Ceiling(
                    totalCount / (double)pageSize),
                Content = _mapper.Map<List<SongResponse>>(items)
            };
        }

        public Task<int> CountBySongIdAsync(Guid songId) =>
            _repo.CountBySongIdAsync(songId);

        public async Task<bool> AddAsync(Guid userId, Guid songId)
        {
            var exists = await _repo.ExistsAsync(userId, songId);
            if (exists)
                return false; // đã favorite rồi

            await _repo.AddAsync(userId, songId);
            return true;
        }

        public async Task<bool> RemoveAsync(Guid userId, Guid songId)
        {
            var exists = await _repo.ExistsAsync(userId, songId);
            if (!exists)
                return false; // chưa từng favorite

            await _repo.RemoveAsync(userId, songId);
            return true;
        }
    }
}
