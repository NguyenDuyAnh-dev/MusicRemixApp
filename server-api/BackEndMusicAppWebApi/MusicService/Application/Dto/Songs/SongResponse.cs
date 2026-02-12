using MusicService.Domain.Entities;

namespace MusicService.Application.Dto.Songs
{
    public class SongResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public TimeSpan? Duration { get; set; }
        public string AvatarUrl { get; set; }
        public Guid SingerId { get; set; }
    }
}
