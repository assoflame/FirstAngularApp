using webapp.DataAccess.Interfaces;

namespace webapp.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationContext _context;
        private readonly Lazy<IUserRepository> _userRepo;
        private readonly Lazy<IMeetRepository> _meetRepo;

        public UnitOfWork(ApplicationContext context)
        {
            _context = context;
            _userRepo = new Lazy<IUserRepository>(() => new UserRepository(_context));
            _meetRepo = new Lazy<IMeetRepository>(() => new MeetRepository(_context));
        }

        public IUserRepository Users => _userRepo.Value;
        public IMeetRepository Meets => _meetRepo.Value;

        public async Task SaveAsync()
            => await _context.SaveChangesAsync();
    }
}
