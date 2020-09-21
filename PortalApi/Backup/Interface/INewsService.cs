using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Interface
{
    public interface INewsService
    {
        List<News> GetAllNews();
        News GetNewsById(Guid id);
        void PostNew(News news);
        void Update(Guid id, News news);
        void DeleteNews(Guid id);

    }
}
