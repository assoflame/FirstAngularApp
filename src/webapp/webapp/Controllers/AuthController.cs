﻿using Microsoft.AspNetCore.Mvc;
using webapp.Services.Interfaces;
using webapp.Shared.DataTransferObjects;

namespace webapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IServiceManager _services;

        public AuthController(IServiceManager services)
        {
            _services = services;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInDto userSignInDto)
        {
            if (!await _services.AuthService.ValidateUserAsync(userSignInDto))
                return Unauthorized();

            return Ok(new { Token = await _services.AuthService.CreateTokenAsync(populateExp: true) });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenDto tokenDto)
        {
            return Ok(await _services.AuthService.RefreshTokenAsync(tokenDto));
        }
    }
}
