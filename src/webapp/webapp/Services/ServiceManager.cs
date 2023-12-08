using webapp.DataAccess.Interfaces;
using webapp.Services.Interfaces;

namespace webapp.Services
{
    public class ServiceManager : IServiceManager
    {
        private readonly Lazy<IAuthService> _authService;
        private readonly Lazy<IUsersService> _usersService;

        public ServiceManager(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _authService = new Lazy<IAuthService>(
                () => new AuthService(unitOfWork, configuration));

            _usersService = new Lazy<IUsersService>(
                () => new UsersService(unitOfWork));
        }

        public IAuthService AuthService => _authService.Value;
        public IUsersService UsersService => _usersService.Value;
    }
}
