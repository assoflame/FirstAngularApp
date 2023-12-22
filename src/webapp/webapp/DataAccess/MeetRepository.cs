using Microsoft.EntityFrameworkCore;
using webapp.DataAccess.Interfaces;
using webapp.Models;
using webapp.Shared.DataTransferObjects;

namespace webapp.DataAccess
{
    public class MeetRepository : GenericRepository<Meet>, IMeetRepository
    {
        public MeetRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<Meet>> GetMeets()
        {
            var meets = await DbContext
                .Meets
                .Include(meet => meet.CustomersMeets)
                .ToListAsync();

            return meets;
        }
    }
}
