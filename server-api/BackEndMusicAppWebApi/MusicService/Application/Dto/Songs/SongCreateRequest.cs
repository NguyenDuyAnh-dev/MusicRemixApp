namespace MusicService.Application.Dto.Songs
{
    public class SongCreateRequest
    {
        public string Title { get; set; }
        public IFormFile Url { get; set; }
        public IFormFile AvatarUrl { get; set; }
    }
}
