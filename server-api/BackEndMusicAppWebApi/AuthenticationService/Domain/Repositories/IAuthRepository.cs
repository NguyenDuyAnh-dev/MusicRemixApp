using AuthenticationService.Domain.Entities;

namespace AuthenticationService.Domain.Repositories
{
    public interface IAuthRepository
    {
        Task AddRefreshTokenAsync(RefreshToken token);
        Task<RefreshToken> GetRefreshTokenAsync(string token);
        Task RevokeRefreshTokenAsync(RefreshToken token);
    }
}
