namespace MusicService.Domain.Entities
{
    public class Playlist
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public Guid UserId { get; set; } // lấy từ AuthService JWT

        public List<PlaylistSong> PlaylistSongs { get; set; } = new();
    }
}
