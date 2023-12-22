namespace webapp.DataAccess.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository Users { get; }
        IMeetRepository Meets { get; }

        Task SaveAsync();
    }
}
