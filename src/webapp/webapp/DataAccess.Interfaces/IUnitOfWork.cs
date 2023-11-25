namespace webapp.DataAccess.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository Users { get; }

        Task SaveAsync();
    }
}
