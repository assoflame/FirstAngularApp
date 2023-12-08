using webapp.DataAccess.Interfaces;
using webapp.Models;
using webapp.Services.Interfaces;

namespace webapp.Services
{
    public class UsersService : IUsersService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UsersService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _unitOfWork.Users.GetUsersAsync();
        }
    }
}
