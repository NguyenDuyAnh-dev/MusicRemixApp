namespace MusicService.Application.Dto.Songs
{
    public class SongUpdaterequest
    {
        public string? Title { get; set; }
        public IFormFile? Avatar { get; set; }
        public IFormFile? Audio { get; set; }
    }
}
