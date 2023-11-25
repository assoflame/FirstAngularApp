using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using webapp.DataAccess.Interfaces;
using webapp.Models;
using webapp.Services.Interfaces;
using webapp.Shared.DataTransferObjects;

namespace webapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        private User _user;

        public AuthService(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }

        public async Task<bool> ValidateUserAsync(SignInDto signInDto)
        {
            _user = await _unitOfWork.Users
                .GetUserByUsernameAsync(signInDto.Username, trackChanges: false);

            if (_user == null)
            {
                return false;
            }

            var tmpHash = ComputeMD5HashString(String.Concat(signInDto.Password, _user.Username));

            var passwordHash = ComputeMD5HashString(
                String.Concat(signInDto.Password, _user.Username));

            if (passwordHash != _user.PasswordHash)
            {
                return false;
            }
            return true;
        }

        private string ComputeMD5HashString(string str)
        {
            var md5 = MD5.Create();
            byte[] hash = md5.ComputeHash(Encoding.UTF8.GetBytes(str));

            return Convert.ToHexString(hash);
        }

        private string GenerateRefreshToken()
        {
            var rndNumber = new byte[32];
            var rndGenerator = RandomNumberGenerator.Create();
            rndGenerator.GetBytes(rndNumber);

            return Convert.ToBase64String(rndNumber);
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtSettings["secretKey"])),
                ValidateLifetime = true,
                ValidIssuer = jwtSettings["validIssuer"],
                ValidAudience = jwtSettings["validAudience"]
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out
                securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                                           StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

        public async Task<TokenDto> CreateTokenAsync(bool populateExp)
        {
            var signingCredentials = GetSigningCredentials();
            var claims = GetClaims();
            var tokenOptions = GenerateTokenOptions(signingCredentials, claims);
            var refreshToken = GenerateRefreshToken();
            _user.RefreshToken = refreshToken;
            if (populateExp)
                _user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            _unitOfWork.Users.Update(_user);
            await _unitOfWork.SaveAsync();
            var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return new TokenDto(accessToken, refreshToken);
        }
        private SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtSettings")["secretKey"]);
            var secret = new SymmetricSecurityKey(key);
            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private List<Claim> GetClaims()
        {
            var claims = new List<Claim>
            {
                new Claim("Username", _user.Username),
                new Claim("Role", _user.Role),
                new Claim("Id", _user.Id.ToString())
            };

            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials,
            List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var tokenOptions = new JwtSecurityToken
            (
                issuer: jwtSettings["validIssuer"],
                audience: jwtSettings["validAudience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Double.Parse(jwtSettings["expires"])),
                signingCredentials: signingCredentials
            );

            return tokenOptions;
        }

        public async Task<TokenDto> RefreshTokenAsync(TokenDto tokenDto)
        {
            var principal = GetPrincipalFromExpiredToken(tokenDto.AccessToken);

            var username = principal?.FindFirst("Username")?.Value;

            var user = await _unitOfWork.Users
                .GetUserByUsernameAsync(username, trackChanges: true);

            if (user is null || user.RefreshToken != tokenDto.RefreshToken ||
                   user.RefreshTokenExpiryTime < DateTime.Now)
            {
                //throw new RefreshTokenBadRequest();
                throw new ArgumentException();
            }

            _user = user;
            return await CreateTokenAsync(populateExp: false);
        }
    }
}
