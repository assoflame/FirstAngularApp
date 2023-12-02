using webapp.Shared.DataTransferObjects;

namespace webapp.Services.Interfaces
{
    public interface IAuthService
    {
        Task<bool> ValidateUserAsync(SignInDto userForSignInDto);
        Task<TokenDto> CreateTokenAsync(bool populateExp);
        Task<TokenDto> RefreshTokenAsync(TokenDto tokenDto);
        Task SignUpAsync(SignUpDto userForSignUpDto);
    }
}
