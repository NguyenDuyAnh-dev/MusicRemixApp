namespace AuthenticationService.Application.dto
{
    public record RegisterDto
    (
        string Email,
        string Password,
        string FullName,
        string Role
    );
}
