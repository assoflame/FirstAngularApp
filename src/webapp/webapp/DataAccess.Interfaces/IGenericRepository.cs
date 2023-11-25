using System.Linq.Expressions;

namespace webapp.DataAccess.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> FindAll(bool trackChanges);
        IQueryable<TEntity> FindByCondition(Expression<Func<TEntity, bool>> condition,
            bool trackChanges);
        void Create(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
    }
}
