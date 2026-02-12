using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicService.Application.Dto.Singers;
using MusicService.Application.Services;
using MusicService.Domain.Entities;

namespace MusicService.Controllers
{
    [ApiController]
    [Route("api/singers")]
    [Authorize]
    public class SingerController : ControllerBase
    {
        private readonly ISingerService _service;

        public SingerController(ISingerService service)
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


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var singer = await _service.GetByIdAsync(id);
            return singer == null ? NotFound() : Ok(singer);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] SingerCreateRequest request)
        {
            var result = await _service.AddAsync(request);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromForm] SingerUpdaterequest singer)
        {
            var result = await _service.UpdateAsync(id, singer);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted)
                return NotFound();

            return Ok(deleted);
        }

    }
}
