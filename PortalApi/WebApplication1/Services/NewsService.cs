using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class NewsService : INewsService
    {
        private readonly IPortalRepository<News> repository;

        public NewsService(IPortalRepository<News> repository)
        {
            this.repository = repository;
        }

        public void DeleteNews(Guid id)
        {
            var news = repository.GetById(id);
            repository.Delete(news);
        }

        public List<News> GetAllNews()
        {
            return repository.GetAll().ToList();
        }

        public News GetNewsById(Guid id)
        {
            return repository.GetById(id);
        }

        public void PostNew(News news)
        {
            repository.Insert(news);
        }

        public void Update(Guid id, News news)
        {
            var newDetail = repository.GetById(id);

            newDetail.Content = news.Content;
            newDetail.DateOfEvent = news.DateOfEvent;

            repository.Update(newDetail);
        }
    }
}
