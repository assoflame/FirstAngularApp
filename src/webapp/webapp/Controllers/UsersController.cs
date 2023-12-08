using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapp.Services.Interfaces;

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

        public async Task<IActionResult> Users()
        {
            var users = await _services.UsersService.GetUsersAsync();

            return Ok(users);
        }
    }
}
