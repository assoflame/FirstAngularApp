using webapp.DataAccess.Interfaces;

namespace webapp.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationContext _context;
        private readonly Lazy<IUserRepository> _userRepo;

        public UnitOfWork(ApplicationContext context)
        {
            _context = context;
            _userRepo = new Lazy<IUserRepository>(() => new UserRepository(_context));
        }

        public IUserRepository Users => _userRepo.Value;

        public async Task SaveAsync()
            => await _context.SaveChangesAsync();
    }
}
