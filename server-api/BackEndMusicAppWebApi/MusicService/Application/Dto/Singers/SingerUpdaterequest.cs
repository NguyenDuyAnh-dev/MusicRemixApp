namespace MusicService.Application.Dto.Singers
{
    public class SingerUpdaterequest
    {
        public string Name { get; set; }
        public IFormFile? Avatar { get; set; }
    }
}
