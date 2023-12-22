using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapp.Models;
using webapp.Services.Interfaces;
using webapp.Shared.DataTransferObjects;

namespace webapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "admin")]
    public class UsersController : ControllerBase
    {
        private readonly IServiceManager _services;

        public UsersController(IServiceManager services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _services.UsersService.GetUsersAsync();

            return Ok(users);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _services.UsersService.GetUserByIdAsync(id);

            if (user is null)
                return NotFound();

            return Ok(user);
        }

        [HttpPut("{userId:int}")]
        public async Task<IActionResult> UpdateUser(int userId, [FromBody] UserUpdateDto userUpdateDto)
        {
            await _services.UsersService.UpdateUser(userId, userUpdateDto);

            return Ok();
        }
    }
}
