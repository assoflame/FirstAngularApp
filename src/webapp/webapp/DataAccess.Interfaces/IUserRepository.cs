using webapp.Models;

namespace webapp.DataAccess.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetUserByIdAsync(int id, bool trackChanges);
        Task<User?> GetUserByUsernameAsync(string email, bool trackChanges);
    }
}
