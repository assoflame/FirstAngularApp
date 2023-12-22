using webapp.DataAccess.Interfaces;
using webapp.Models;
using webapp.Services.Interfaces;
using webapp.Shared.DataTransferObjects;

namespace webapp.Services
{
    public class UsersService : IUsersService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UsersService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _unitOfWork.Users.GetUserByIdAsync(id);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _unitOfWork.Users.GetUsersAsync();
        }

        public async Task UpdateUser(int userId, UserUpdateDto userUpdateDto)
        {
            var user = await _unitOfWork.Users.GetUserByIdAsync(userId);

            if (user is null)
                throw new ArgumentException();

            user.Age = userUpdateDto.Age;
            user.Firstname = userUpdateDto.Firstname;
            user.Lastname = userUpdateDto.Lastname;
            user.Username = userUpdateDto.Username;

            _unitOfWork.Users.Update(user);
            await _unitOfWork.SaveAsync();
        }
    }
}
