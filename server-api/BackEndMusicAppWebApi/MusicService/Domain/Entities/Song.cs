namespace MusicService.Domain.Entities
{
    public class Song
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public TimeSpan? Duration { get; set; }
        public string AvatarUrl { get; set; }
        public Guid SingerId { get; set; }
        public Singer Singer { get; set; }
        public List<PlaylistSong> PlaylistSongs { get; set; } = new();
    }
}
