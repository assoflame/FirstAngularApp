namespace webapp.Services.Interfaces
{
    public interface IServiceManager
    {
        IAuthService AuthService { get; }
        IUsersService UsersService { get; }
    }
}
