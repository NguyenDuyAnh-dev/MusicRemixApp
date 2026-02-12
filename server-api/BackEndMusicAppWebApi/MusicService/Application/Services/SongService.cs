using AutoMapper;
using MusicService.Application.Dto.Pageds;
using MusicService.Application.Dto.Songs;
using MusicService.Domain.Entities;
using MusicService.Domain.Repositories;
using MusicService.Infrastructure.Helper;

namespace MusicService.Application.Services
{
    public class SongService : ISongService
    {
        private readonly ISongRepository _repo;
        private readonly ISingerRepository _singerRepo;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorage;

        public SongService(ISongRepository repo, IMapper mapper, IFileStorageService fileStorage, ISingerRepository singerRepository)
        {
            _repo = repo;
            _mapper = mapper;
            _fileStorage = fileStorage;
            _singerRepo = singerRepository;
        }

        public async Task<List<SongResponse>> GetAllAsync()
        {
            var songs = await _repo.GetAllAsync();
            var results = _mapper.Map<List<SongResponse>>(songs);
            return results;
        }
        public async Task<PagedResponse<SongResponse>> GetAllPagedAsync(int pageNumber, int pageSize)
        {
            if (pageNumber <= 0) pageNumber = 1;
            if (pageSize <= 0) pageSize = 10;
            var (items, totalCount) = await _repo.GetAllPagedAsync(pageNumber, pageSize);
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            return new PagedResponse<SongResponse>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalElements = totalCount,
                TotalPages = totalPages,
                Content = _mapper.Map<List<SongResponse>>(items)
            };
        }

        public async Task<SongResponse?> GetByIdAsync(Guid id)
        {
            var song = await _repo.GetByIdAsync(id);
            var result = _mapper.Map<SongResponse?>(song);
            return result;
        }

        ////ham nay lay duration cua file audio
        //private TimeSpan GetAudioDuration(Stream audioStream)
        //{
        //    audioStream.Position = 0;

        //    using var file = TagLib.File.Create(
        //        new StreamFileAbstraction("audio", audioStream, audioStream)
        //    );

        //    return file.Properties.Duration;
        //}

        public async Task<SongResponse> AddAsync(Guid singerId, SongCreateRequest request)
        {

            var singer = await _singerRepo.GetByIdAsync(singerId);
            if(singer == null)
                throw new Exception("Singer không tồn tại");

            var song = _mapper.Map<Song>(request);

            song.SingerId = singerId;
            //song.Singer = singer;

            // luu file avatar
            if (request.AvatarUrl != null)
            {
                using var stream = request.AvatarUrl.OpenReadStream(); // using de Tự động dispose, Tránh memory leak KHÔNG load toàn bộ file vào RAM ở đây

                song.AvatarUrl = await _fileStorage.UploadAsync(
                    stream,
                    $"{Guid.NewGuid()}{Path.GetExtension(request.AvatarUrl.FileName)}",
                    "song-avatar");
            }
            // luu URL file nhac
            if (request.Url != null)
            {
                using var stream = request.Url.OpenReadStream(); // using de Tự động dispose, Tránh memory leak KHÔNG load toàn bộ file vào RAM ở đây

                //tinh duration
                song.Duration = null;

                //Reset stream
                stream.Position = 0;

                song.Url = await _fileStorage.UploadAsync(
                    stream,
                    $"{Guid.NewGuid()}{Path.GetExtension(request.Url.FileName)}",
                    "song-music");
            }

            await _repo.AddAsync(song);

            return _mapper.Map<SongResponse>(song);
        }

        public async Task<SongResponse> UpdateAsync(Guid songId, SongUpdaterequest request)
        {
            var song = await _repo.GetByIdAsync(songId);
            if (song == null)
                throw new Exception("Song không tồn tại");

            // ===== update title =====
            if (!string.IsNullOrWhiteSpace(request.Title))
            {
                song.Title = request.Title;
            }

            // ===== update avatar =====
            if (request.Avatar != null)
            {
                using var stream = request.Avatar.OpenReadStream();

                song.AvatarUrl = await _fileStorage.UploadAsync(
                    stream,
                    $"{Guid.NewGuid()}{Path.GetExtension(request.Avatar.FileName)}",
                    "song-avatar");
            }

            // ===== update audio =====
            if (request.Audio != null)
            {
                using var stream = request.Audio.OpenReadStream();

                // tính lại duration
                song.Duration = null;

                stream.Position = 0;

                song.Url = await _fileStorage.UploadAsync(
                    stream,
                    $"{Guid.NewGuid()}{Path.GetExtension(request.Audio.FileName)}",
                    "song-music");
            }

            await _repo.UpdateAsync(song);

            return _mapper.Map<SongResponse>(song);
        }


        public async Task<bool> DeleteAsync(Guid id)
        {
            return await _repo.DeleteAsync(id);
        }

    }
}
