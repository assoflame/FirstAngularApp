using webapp.Models;
using webapp.Shared.DataTransferObjects;

namespace webapp.Services.Interfaces
{
    public interface IUsersService
    {
        public Task<IEnumerable<User>> GetUsersAsync();
        public Task<User> GetUserByIdAsync(int id);
        public Task UpdateUser(int userId, UserUpdateDto userUpdateDto);
    }
}
