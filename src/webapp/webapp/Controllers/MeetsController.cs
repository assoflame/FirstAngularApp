using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapp.Services.Interfaces;

namespace webapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeetsController : ControllerBase
    {
        private readonly IServiceManager _services;

        public MeetsController(IServiceManager services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> GetMeetsData()
        {
            var meetsData = await _services.MeetsService.GetMeetsData();

            return Ok(meetsData);
        }
    }
}
