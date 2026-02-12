using Microsoft.EntityFrameworkCore;
using MusicService.Domain.Entities;
using MusicService.Domain.Repositories;
using MusicService.Infrastructure.Data;

namespace MusicService.Infrastructure.Repositories
{
    public class SongRepository : ISongRepository
    {
        private readonly MusicDbContext _db;

        public SongRepository(MusicDbContext db)
        {
            _db = db;
        }

        public Task<List<Song>> GetAllAsync() =>
            _db.Songs.Include(s => s.Singer).ToListAsync();

        public async Task<(List<Song> Items, int TotalCount)> GetAllPagedAsync(int pageNumber, int pageSize)
        {
            var query = _db.Songs
                .Include(s => s.Singer)
                .AsNoTracking()
                .OrderByDescending(s => s.Id);
            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (items, totalCount);
        }

        public Task<Song?> GetByIdAsync(Guid id) =>
            _db.Songs.Include(s => s.Singer).FirstOrDefaultAsync(x => x.Id == id);

        public async Task AddAsync(Song song)
        {
            _db.Songs.Add(song);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Song song)
        {
            _db.Songs.Update(song);
            await _db.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var song = await _db.Songs.FindAsync(id);
            if (song == null)
                return false;

            _db.Songs.Remove(song);
            await _db.SaveChangesAsync();
            return true;
        }

    }
}
