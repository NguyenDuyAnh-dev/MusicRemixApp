using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicService.Application;
using MusicService.Application.Dto.Songs;
using MusicService.Application.Services;
using MusicService.Domain.Entities;

namespace MusicService.Controllers
{
    [ApiController]
    [Route("api/songs")]
    [Authorize]
    public class SongController : ControllerBase
    {
        private readonly ISongService _service;

        public SongController(ISongService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("paged")]
        public async Task<IActionResult> GetPaged(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await _service.GetAllPagedAsync(pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("singer/{singerId}")]
        public async Task<IActionResult> GetBySingerId(Guid singerId)
        {
            var songs = await _service.GetBySingerIdAsync(singerId);
            return Ok(songs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var song = await _service.GetByIdAsync(id);
            return song == null ? NotFound() : Ok(song);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Guid singerId, [FromForm] SongCreateRequest song)
        {
            var result = await _service.AddAsync(singerId, song);
            return Ok(result);
        }

        [HttpPut("{songId}")]
        public async Task<IActionResult> Update(Guid songId, [FromForm] SongUpdaterequest song)
        {
            var result = await _service.UpdateAsync(songId, song);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteAsync(id);
            return Ok();
        }
    }

}
