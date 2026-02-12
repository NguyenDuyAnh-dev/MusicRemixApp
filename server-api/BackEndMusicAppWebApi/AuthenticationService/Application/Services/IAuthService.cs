namespace AuthenticationService.Application.Services
{
    public interface IAuthService
    {
        Task<object> RegisterAsync(string email, string password, string fullName, string role);
        Task<object> LoginAsync(string email, string password);
        Task<object> RefreshTokenAsync(string refreshToken);
    }
}
