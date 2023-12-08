using webapp.Models;

namespace webapp.Services.Interfaces
{
    public interface IUsersService
    {
        public Task<IEnumerable<User>> GetUsersAsync();
    }
}
