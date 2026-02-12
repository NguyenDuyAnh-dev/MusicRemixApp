using AutoMapper;
using MusicService.Application.Dto.Playlists;
using MusicService.Domain.Entities;

namespace MusicService.Application.Mappings
{
    public class PlaylistMapping : Profile
    {
        public PlaylistMapping()
        {
            CreateMap<Playlist, PlaylistResponse>()
            .ForMember(dest => dest.Songs,
                opt => opt.MapFrom(src =>
                    src.PlaylistSongs.Select(ps => ps.Song)));
        }
    }
}
