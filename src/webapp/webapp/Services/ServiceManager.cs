using webapp.DataAccess.Interfaces;
using webapp.Services.Interfaces;

namespace webapp.Services
{
    public class ServiceManager : IServiceManager
    {
        private readonly Lazy<IAuthService> _authService;

        public ServiceManager(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _authService = new Lazy<IAuthService>(
                () => new AuthService(unitOfWork, configuration));
        }

        public IAuthService AuthService => _authService.Value;
    }
}
