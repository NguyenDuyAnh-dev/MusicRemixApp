namespace MusicService.Domain.Entities
{
    public class Favorite
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; } // lấy từ token
        public Guid SongId { get; set; }
        public Song Song { get; set; }
    }
}
