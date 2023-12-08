using webapp.Models;

namespace webapp.DataAccess.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetUserByIdAsync(int id);
        Task<User?> GetUserByUsernameAsync(string username);
        Task<IEnumerable<User>> GetUsersAsync();
    }
}
