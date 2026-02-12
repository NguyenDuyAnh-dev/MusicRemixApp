using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicService.Application.Services;
using MusicService.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MusicService.Controllers
{
    [ApiController]
    [Route("api/favorites")]
    [Authorize]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteService _service;

        public FavoriteController(IFavoriteService service)
        {
            _service = service;
        }
        // lay userId va parse sang Guid
        protected Guid GetUserId()
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(id))
                throw new UnauthorizedAccessException("Token không có user id");

            return Guid.Parse(id);
        }


        [HttpGet]
        public async Task<IActionResult> GetMyFavorites()
        {
            var userId = GetUserId();
            return Ok(await _service.GetByUserAsync(userId!));
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetMyFavoritesPaged(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var userId = GetUserId();
            var result = await _service
                .GetAllByUserPagedAsync(userId, pageNumber, pageSize);

            return Ok(result);
        }


        [HttpGet("count/{songId}")]
        public async Task<IActionResult> CountFavoritesBySongId(Guid songId)
        {
            var count = await _service.CountBySongIdAsync(songId);
            return Ok(count);
        }

        [HttpPost("{songId}")]
        public async Task<IActionResult> AddFavorite(Guid songId)
        {
            var userId = GetUserId();
            var result = await _service.AddAsync(userId, songId);

            return result
                ? Ok()
                : Conflict("Bài hát đã được favorite");
        }

        [HttpDelete("{songId}")]
        public async Task<IActionResult> RemoveFavorite(Guid songId)
        {
            var userId = GetUserId();
            var result = await _service.RemoveAsync(userId, songId);

            return result
                ? NoContent()
                : NotFound();
        }
    }
}
