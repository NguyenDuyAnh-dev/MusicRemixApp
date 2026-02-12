using AutoMapper;
using MusicService.Application.Dto.Singers;
using MusicService.Application.Dto.Songs;
using MusicService.Domain.Entities;

namespace MusicService.Application.Mappings
{
    public class SongMapping : Profile
    {
        public SongMapping()
        {
            // Request → Entity
            CreateMap<SongCreateRequest, Song>()
                .ForMember(dest => dest.AvatarUrl, opt => opt.Ignore()) // không map AvatarUrl từ SongCreateRequest (vì không có trong request)
                .ForMember(Song => Song.Duration, opt => opt.Ignore()) // không map Duration từ SongCreateRequest (vì không có trong request)
                .ForMember(dest => dest.Url, opt => opt.Ignore()) // không map Url từ SongCreateRequest
                .ForMember(Song => Song.Singer, opt => opt.Ignore()) // không map Singer từ SongCreateRequest
                .ForMember(dest => dest.SingerId, opt => opt.Ignore()) // không map SingerId từ SongCreateRequest
                .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid())); //Mỗi lần map → tạo User.Id mới, _ = source object (SingerCreateRequest), nhưng không dùng
            // dest la cua Singer, _ (source) la cua SingerCreateRequest

            CreateMap<SongUpdaterequest, Song>()
                .ForAllMembers(opt =>
                    opt.Condition((src, dest, srcMember) =>
                        srcMember != null
                    )
                ); // update chỉ map những trường khác null


            // Entity → Response
            CreateMap<Song, SongResponse>(); // cai nay co the map cho moi singer va cho ca list<Singer> tu dong map sang list<SingerResponse>
        }
    }
}
