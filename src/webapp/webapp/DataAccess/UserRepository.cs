using Microsoft.EntityFrameworkCore;
using webapp.DataAccess.Interfaces;
using webapp.Models;

namespace webapp.DataAccess
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationContext context) : base(context) { }

        public async Task<User?> GetUserByIdAsync(int id, bool trackChanges)
            => await FindByCondition(user => user.Id == id, trackChanges)
                    .FirstOrDefaultAsync();


        public async Task<User?> GetUserByUsernameAsync(string email, bool trackChanges)
            => await FindByCondition(user => user.Username == email, trackChanges)
                .FirstOrDefaultAsync();
    }
}
