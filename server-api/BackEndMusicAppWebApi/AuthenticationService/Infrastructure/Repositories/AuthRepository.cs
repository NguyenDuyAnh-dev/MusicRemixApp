using AuthenticationService.Domain.Entities;
using AuthenticationService.Domain.Repositories;
using AuthenticationService.Infrastructure.DBContext;
using Microsoft.EntityFrameworkCore;

namespace AuthenticationService.Infrastructure.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _context;

        public AuthRepository(ApplicationDbContext context) => _context = context;

        public async Task AddRefreshTokenAsync(RefreshToken token)
        {
            await _context.RefreshTokens.AddAsync(token);
            await _context.SaveChangesAsync();
        }

        public async Task<RefreshToken> GetRefreshTokenAsync(string token)
        {
            return await _context.RefreshTokens
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Token == token);
        }

        public async Task RevokeRefreshTokenAsync(RefreshToken token)
        {
            token.Revoked = DateTime.UtcNow;
            _context.RefreshTokens.Update(token);
            await _context.SaveChangesAsync();
        }
    }
}
