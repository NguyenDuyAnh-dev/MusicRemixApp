namespace MusicService.Application.Dto.Singers
{
    public class SingerCreateRequest
    {
        public string Name { get; set; }
        public IFormFile? Avatar { get; set; }
    }
}
