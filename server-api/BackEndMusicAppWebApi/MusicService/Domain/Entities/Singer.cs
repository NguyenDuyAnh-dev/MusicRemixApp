namespace MusicService.Domain.Entities
{
    public class Singer
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? AvatarUrl { get; set; }

        public List<Song> Songs { get; set; }
    }
}
