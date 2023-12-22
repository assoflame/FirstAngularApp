using webapp.Models;
using webapp.Shared.DataTransferObjects;

namespace webapp.DataAccess.Interfaces
{
    public interface IMeetRepository : IGenericRepository<Meet>
    {
        Task<IEnumerable<Meet>> GetMeets();
    }
}
