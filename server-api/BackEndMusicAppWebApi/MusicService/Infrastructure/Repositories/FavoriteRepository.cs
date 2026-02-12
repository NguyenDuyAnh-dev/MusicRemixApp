using Microsoft.EntityFrameworkCore;
using MusicService.Domain.Entities;
using MusicService.Domain.Repositories;
using MusicService.Infrastructure.Data;

namespace MusicService.Infrastructure.Repositories
{
    public class FavoriteRepository : IFavoriteRepository
    {
        private readonly MusicDbContext _db;

        public FavoriteRepository(MusicDbContext db)
        {
            _db = db;
        }
        // lay cac bai hat da favorite cua user
        public async Task<List<Song>> GetFavoriteSongsByUserAsync(Guid userId)
        {
            return await _db.Favorites
                .Where(f => f.UserId == userId)
                .Include(f => f.Song)
                    .ThenInclude(s => s.Singer)
                .Select(f => f.Song) // dung de return ve Song thay vi Favorite
                .AsNoTracking()
                .ToListAsync();
        }
        //cach 2
        //public async Task<List<Song>> GetFavoriteSongsByUserAsync(Guid userId)
        //{
        //    return await _db.Favorites
        //        .Where(f => f.UserId == userId)
        //        .Select(f => new Song
        //        {
        //            Id = f.Song.Id,
        //            Name = f.Song.Name,
        //            Duration = f.Song.Duration,
        //            Singer = f.Song.Singer
        //        })
        //        .AsNoTracking()
        //        .ToListAsync();
        //}

        public async Task<(List<Song> Items, int TotalCount)> GetPagedByUserAsync(Guid userId, int pageNumber, int pageSize)
        {
            var query = _db.Favorites
                .Where(f => f.UserId == userId)
                .Include(f => f.Song)
                    .ThenInclude(s => s.Singer)
                .Select(f => f.Song)
                .AsNoTracking()
                .OrderByDescending(s => s.Id); // nếu có

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalCount);
        }




        // Đếm số lượt favorite của 1 bài hát
        public async Task<int> CountBySongIdAsync(Guid songId)
        {
            return await _db.Favorites
                .AsNoTracking()
                .CountAsync(f => f.SongId == songId);
        }

        // Kiểm tra user đã favorite bài hát chưa
        public async Task<bool> ExistsAsync(Guid userId, Guid songId)
        {
            return await _db.Favorites
                .AsNoTracking()
                .AnyAsync(f => f.UserId == userId && f.SongId == songId);
        }

        public async Task AddAsync(Guid userId, Guid songId)
        {
            var favorite = new Favorite
            {
                UserId = userId,
                SongId = songId,
            };
            _db.Favorites.Add(favorite);
            await _db.SaveChangesAsync();
        }

        public async Task RemoveAsync(Guid userId, Guid songId)
        {
            var fav = await _db.Favorites
                .FirstOrDefaultAsync(f => f.UserId == userId && f.SongId == songId);

            if (fav != null)
            {
                _db.Favorites.Remove(fav);
                await _db.SaveChangesAsync();
            }
        }
    }
}
