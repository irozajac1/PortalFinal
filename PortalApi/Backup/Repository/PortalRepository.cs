using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebApplication1.Database;
using WebApplication1.Interface;

namespace WebApplication1.Repository
{
    public class PortalRepository<T> : IPortalRepository<T> where T : class
    {
        protected readonly PortalContext context;
        private DbSet<T> entities;
        
        public PortalRepository(PortalContext context)
        {
            this.context = context;
            entities = context.Set<T>();
        }

        public void Delete(T entity)
        {
            if (entity == null) throw new ArgumentNullException("entity");
            this.context.Set<T>().Remove(entity);
            context.SaveChanges();

        }

        public List<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return context.Set<T>().Where(expression).ToList();
        }

        public IEnumerable<T> GetAll()
        {
            return entities.AsEnumerable();
        }
        public virtual IQueryable<T> IncludeAll()
        {
            var query = context.Set<T>().AsQueryable();
            foreach (var property in context.Model.FindEntityType(typeof(T)).GetNavigations())
                query = query.Include(property.Name);
            var x = query;
            return x;
        }


        public T GetById(Guid id)
        {
            return context.Set<T>().Find(id);
        }

        public void Insert(T entity)
        {
            if (entity == null) throw new ArgumentNullException("entity");

            entities.Add(entity);
            context.SaveChanges();
        }

        public void Update(T entity)
        {
            if (entity == null) throw new ArgumentNullException("entity");

            context.Set<T>().Attach(entity);
            context.Entry(entity).State = EntityState.Modified;
            context.SaveChanges();

        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}
