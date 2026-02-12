using Microsoft.EntityFrameworkCore;
using MusicService.Domain.Entities;
using MusicService.Domain.Repositories;
using MusicService.Infrastructure.Data;

namespace MusicService.Infrastructure.Repositories
{
    public class SingerRepository : ISingerRepository
    {
        private readonly MusicDbContext _db;

        public SingerRepository(MusicDbContext db)
        {
            _db = db;
        }

        public Task<List<Singer>> GetAllAsync() =>
            _db.Singers.Include(s => s.Songs).OrderByDescending(si => si.Id).ToListAsync();
        public async Task<(List<Singer> Items, int TotalCount)> GetAllPagedAsync(int pageNumber, int pageSize)
        {
            var query = _db.Singers
                .Include(s => s.Songs)
                .AsNoTracking()
                .OrderByDescending(s => s.Id);

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalCount);
        }


        public Task<Singer?> GetByIdAsync(Guid id) =>
            _db.Singers.Include(s => s.Songs).AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);

        public async Task AddAsync(Singer singer)
        {
            _db.Singers.Add(singer);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Singer singer)
        {
            _db.Singers.Update(singer);
            await _db.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var singer = await _db.Singers.FindAsync(id);
            if (singer == null)
                return false;

            _db.Singers.Remove(singer);
            await _db.SaveChangesAsync();
            return true;
        }

    }
}
