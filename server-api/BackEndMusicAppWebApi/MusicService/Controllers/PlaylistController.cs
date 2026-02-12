using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicService.Application.Dto.Playlists;
using MusicService.Application.Services;
using MusicService.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MusicService.Controllers
{
    [ApiController]
    [Route("api/playlists")]
    [Authorize]
    public class PlaylistController : ControllerBase
    {
        private readonly IPlaylistService _service;

        public PlaylistController(IPlaylistService service)
        {
            _service = service;
        }

        // Helper: lấy UserId từ JWT
        private Guid GetUserId()
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier)
                ?? User.FindFirst(JwtRegisteredClaimNames.Sub);

            if (userIdClaim == null)
                throw new UnauthorizedAccessException("Token không chứa user id");

            return Guid.Parse(userIdClaim.Value);
        }


        [HttpGet("me")]
        public async Task<IActionResult> GetMyPlaylists()
        {
            var userId = GetUserId();
            var playlists = await _service.GetMyPlaylistsAsync(userId);
            return Ok(playlists);
        }

        [HttpGet("me/paged")]
        public async Task<IActionResult> GetMyPlaylistsPaged(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var userId = GetUserId();

            var result = await _service
                .GetMyPlaylistsPagedAsync(userId, pageNumber, pageSize);

            return Ok(result);
        }


        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var playlist = await _service.GetByIdAsync(id);
            if (playlist == null)
                return NotFound();

            return Ok(playlist);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePlaylistRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
                return BadRequest("Tên playlist không được để trống");

            var userId = GetUserId();
            await _service.CreateAsync(userId, request.Name);

            return Ok("Tạo playlist thành công");
        }

        [HttpPost("{playlistId:guid}/songs/{songId:guid}")]
        public async Task<IActionResult> AddSong(Guid playlistId, Guid songId)
        {
            await _service.AddSongAsync(playlistId, songId);
            return Ok("Đã thêm bài hát vào playlist");
        }

        [HttpDelete("{playlistId:guid}/songs/{songId:guid}")]
        public async Task<IActionResult> RemoveSong(Guid playlistId, Guid songId)
        {
            await _service.RemoveSongAsync(playlistId, songId);
            return Ok("Đã xóa bài hát khỏi playlist");
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteAsync(id);
            return Ok("Đã xóa playlist");
        }
    }
}
