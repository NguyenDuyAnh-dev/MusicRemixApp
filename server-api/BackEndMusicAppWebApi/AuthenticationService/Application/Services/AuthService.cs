using AuthenticationService.Domain.Entities;
using AuthenticationService.Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthenticationService.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly IAuthRepository _repo;

        public AuthService(UserManager<ApplicationUser> userManager,
                           RoleManager<IdentityRole> roleManager,
                           IConfiguration config,
                           IAuthRepository repo)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
            _repo = repo;
        }

        public async Task<object> RegisterAsync(string email, string password, string fullName, string role)
        {
            var user = new ApplicationUser
            {
                Email = email,
                UserName = email,
                FullName = fullName,
            };

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
                return new { error = "Register failed", details = result.Errors };

            // Kiểm tra role tồn tại
            if (!await _roleManager.RoleExistsAsync(role))
                throw new Exception("Role does not exist");

            // Gán role cho user
            await _userManager.AddToRoleAsync(user, role);

            return new { message = "Register success" };
        }

        public async Task<object> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
                throw new UnauthorizedAccessException("Invalid email or password");

            var accessToken = await GenerateJwtToken(user);
            var refreshToken = await CreateRefreshToken(user);

            return new
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<object> RefreshTokenAsync(string refreshToken)
        {
            var tokenDb = await _repo.GetRefreshTokenAsync(refreshToken);

            if (tokenDb == null || !tokenDb.IsActive)
                return new { error = "Invalid refresh token" };

            var newJwt = await GenerateJwtToken(tokenDb.User);

            return new
            {
                AccessToken = newJwt,
                RefreshToken = refreshToken
            };
        }

        private async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            var key = _config["Jwt:Key"];
            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];
            var expire = int.Parse(_config["Jwt:AccessTokenExpirationMinutes"]);

            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };

            claims.AddRange(roles.Select(role => new Claim("role", role)));

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expire),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        private async Task<string> CreateRefreshToken(ApplicationUser user)
        {
            var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());

            var refresh = new RefreshToken
            {
                Token = token,
                UserId = user.Id,
                Created = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(int.Parse(_config["Jwt:RefreshTokenExpirationDays"]))
            };

            await _repo.AddRefreshTokenAsync(refresh);
            return token;
        }
    }
}
