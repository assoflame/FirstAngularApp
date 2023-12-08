using Microsoft.EntityFrameworkCore;
using webapp.DataAccess.Interfaces;
using webapp.Models;

namespace webapp.DataAccess
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationContext context) : base(context) { }

        public async Task<User?> GetUserByIdAsync(int id)
            => await DbContext.Users.FirstOrDefaultAsync(user => user.Id == id);

        public async Task<User?> GetUserByUsernameAsync(string username)
            => await DbContext.Users
            .FirstOrDefaultAsync(user => user.Username.Equals(username));

        public async Task<IEnumerable<User>> GetUsersAsync()
            => await DbContext.Users.ToListAsync();
    }
}
