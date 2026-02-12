using MusicService.Application.Dto.Songs;

namespace MusicService.Application.Dto.Playlists
{
    public class PlaylistResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public List<SongResponse> Songs { get; set; } = new();
    }
}
