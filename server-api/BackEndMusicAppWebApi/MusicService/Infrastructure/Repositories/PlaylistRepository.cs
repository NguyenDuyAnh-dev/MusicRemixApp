using Microsoft.EntityFrameworkCore;
using MusicService.Domain.Entities;
using MusicService.Domain.Repositories;
using MusicService.Infrastructure.Data;

namespace MusicService.Infrastructure.Repositories
{
    public class PlaylistRepository : IPlaylistRepository
    {
        private readonly MusicDbContext _db;

        public PlaylistRepository(MusicDbContext db)
        {
            _db = db;
        }

        public Task<List<Playlist>> GetAllByUserAsync(Guid userId) =>
        _db.Playlists
           .Where(p => p.UserId == userId)
           .Include(p => p.PlaylistSongs)
               .ThenInclude(ps => ps.Song)
                   .ThenInclude(s => s.Singer)
           .AsNoTracking()
           .ToListAsync();

        public async Task<(List<Playlist> Items, int TotalCount)> GetAllPagedByUserAsync(Guid userId, int pageNumber, int pageSize)
        {
            var query = _db.Playlists
                .Where(p => p.UserId == userId)
                .Include(p => p.PlaylistSongs)
                    .ThenInclude(ps => ps.Song)
                        .ThenInclude(s => s.Singer)
                .AsNoTracking()
                .OrderByDescending(p => p.Id); // nếu có


            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalCount);
        }


        public Task<Playlist?> GetByIdAsync(Guid playlistId) =>
            _db.Playlists
               .Include(p => p.PlaylistSongs)
                   .ThenInclude(ps => ps.Song)
                       .ThenInclude(s => s.Singer)
               .FirstOrDefaultAsync(p => p.Id == playlistId);

        public async Task AddAsync(Playlist playlist)
        {
            _db.Playlists.Add(playlist);
            await _db.SaveChangesAsync();
        }

        public async Task AddSongAsync(Guid playlistId, Guid songId)
        {
            var exists = await _db.PlaylistSongs
                .AnyAsync(ps => ps.PlaylistId == playlistId && ps.SongId == songId);

            if (exists)
                throw new InvalidOperationException("Song đã tồn tại trong playlist");

            _db.PlaylistSongs.Add(new PlaylistSong
            {
                PlaylistId = playlistId,
                SongId = songId,
                AddedAt = DateTime.UtcNow
            });

            await _db.SaveChangesAsync();
        }

        public async Task RemoveSongAsync(Guid playlistId, Guid songId)
        {
            var item = await _db.PlaylistSongs
                .FirstOrDefaultAsync(ps => ps.PlaylistId == playlistId && ps.SongId == songId);

            if (item != null)
            {
                _db.PlaylistSongs.Remove(item);
                await _db.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(Guid playlistId)
        {
            var playlist = await _db.Playlists.FindAsync(playlistId);
            if (playlist != null)
            {
                _db.Playlists.Remove(playlist);
                await _db.SaveChangesAsync();
            }
        }
    }
}
