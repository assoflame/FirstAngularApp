using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using webapp.DataAccess.Interfaces;

namespace webapp.DataAccess
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity>
         where TEntity : class
    {
        protected ApplicationContext DbContext;

        public GenericRepository(ApplicationContext dbContext)
            => DbContext = dbContext;

        public void Create(TEntity entity) => DbContext.Set<TEntity>().Add(entity);
        public void Update(TEntity entity) => DbContext.Set<TEntity>().Update(entity);
        public void Delete(TEntity entity) => DbContext.Set<TEntity>().Remove(entity);
    }
}
