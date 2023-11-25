using Microsoft.EntityFrameworkCore;
using webapp.Models;

namespace webapp.DataAccess
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public ApplicationContext(DbContextOptions options) : base(options)
        {
        }
    }
}
