using AutoMapper;
using MusicService.Application.Dto.Pageds;
using MusicService.Application.Dto.Singers;
using MusicService.Domain.Entities;
using MusicService.Domain.Repositories;

namespace MusicService.Application.Services
{
    public class SingerService : ISingerService
    {
        private readonly ISingerRepository _repo;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorage;


        public SingerService(ISingerRepository repo, IMapper mapper, IFileStorageService fileStorage)
        {
            _repo = repo;
            _mapper = mapper;
            _fileStorage = fileStorage;
        }

        public async Task<List<SingerResponse>> GetAllAsync()
        {
            var singers = await _repo.GetAllAsync();
            var result = _mapper.Map<List<SingerResponse>>(singers);
            return result;
        }

        public async Task<PagedResponse<SingerResponse>> GetAllPagedAsync(int pageNumber, int pageSize)
        {
            if (pageNumber <= 0) pageNumber = 1;
            if (pageSize <= 0) pageSize = 10;

            var (items, totalCount) = await _repo.GetAllPagedAsync(pageNumber, pageSize);

            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            return new PagedResponse<SingerResponse>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalElements = totalCount,
                TotalPages = totalPages,
                Content = _mapper.Map<List<SingerResponse>>(items)
            };
        }

        public async Task<SingerResponse?> GetByIdAsync(Guid id)
        {
            var singer = await _repo.GetByIdAsync(id);
            var result = _mapper.Map<SingerResponse?>(singer);
            return result;
        }

        public async Task<SingerResponse> AddAsync(SingerCreateRequest request)
        {
            var singer = _mapper.Map<Singer>(request);
            if (request.Avatar != null)
            {
                using var stream = request.Avatar.OpenReadStream(); // using de Tự động dispose, Tránh memory leak KHÔNG load toàn bộ file vào RAM ở đây

                singer.AvatarUrl = await _fileStorage.UploadAsync(
                    stream,
                    $"{Guid.NewGuid()}{Path.GetExtension(request.Avatar.FileName)}",
                    "singer-avatar");
            }
            await _repo.AddAsync(singer);
            var response = _mapper.Map<SingerResponse>(singer);
            return response;
        }
            

        public async Task<SingerResponse> UpdateAsync(Guid id, SingerUpdaterequest request)
        {
            // 1. Lấy dữ liệu cũ
            var singer = await _repo.GetByIdAsync(id);
            if (singer == null)
                throw new Exception("Singer không tồn tại");

            // 2. Cập nhật dữ liệu mới

            // Map các field KHÔNG null
            _mapper.Map(request, singer);

            // xu ly rieng avatar neu ng dung muon cap nhat neu ko thi giu nguyen vi da map o tren
            if (request.Avatar != null)
            {
                using var stream = request.Avatar.OpenReadStream();
                singer.AvatarUrl = await _fileStorage.UploadAsync(
                    stream,
                    $"{Guid.NewGuid()}{Path.GetExtension(request.Avatar.FileName)}",
                    "singer-avatar");
            }

            await _repo.UpdateAsync(singer);
            return _mapper.Map<SingerResponse>(singer);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            return await _repo.DeleteAsync(id);
        }

    }
}
