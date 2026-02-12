using AutoMapper;
using MusicService.Application.Dto.Singers;
using MusicService.Domain.Entities;

namespace MusicService.Application.Mappings
{
    public class SingerMapping : Profile
    {
        // Profile for AutoMapper to map Singer related objects
        public SingerMapping()
        {
            // Add mapping configurations here when needed

            // Request → Entity
            CreateMap<SingerCreateRequest, Singer>()
                .ForMember(dest => dest.AvatarUrl, opt => opt.Ignore()) // không map AvatarUrl từ SingerCreateRequest (vì không có trong request)
                .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid())); //Mỗi lần map → tạo User.Id mới, _ = source object (SingerCreateRequest), nhưng không dùng
            // dest la cua Singer, _ (source) la cua SingerCreateRequest

            CreateMap<SingerUpdaterequest, Singer>()
                .ForAllMembers(opt =>
                    opt.Condition((src, dest, srcMember) =>
                        srcMember != null
                    )
                ); // update chỉ map những trường khác null


            // Entity → Response
            CreateMap<Singer, SingerResponse>(); // cai nay co the map cho moi singer va cho ca list<Singer> tu dong map sang list<SingerResponse>
        }
    }
}
