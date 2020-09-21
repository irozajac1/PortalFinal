using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Database;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    //[Authorize(Roles = "Admin")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService service;

        public NewsController(INewsService service)
        {
            this.service = service;
        }

        // GET: api/News
        [HttpGet]
        public List<News> GetAllNews()
        {
            return service.GetAllNews();
        }

        // GET: api/News/5
        [HttpGet("{id}", Name = "GetNews")]
        public async Task<ActionResult<News>> GetNews(Guid id)
        {
            var news = service.GetNewsById(id);
            if (news == null)
            {
                return NotFound();
            }
            return news;
        }

        // POST: api/News/PostSomeNews
        [HttpPost("PostSomeNews")]
        public async Task<ActionResult<News>> PostNews([FromBody] News news)
        {
            if (news == null)
            {
                return BadRequest();
            }
            service.PostNew(news);

            return Ok();
        }

        //PUT : api/News/UpdateNews
        [HttpPut("UpdateNews/{id}")]
        public IActionResult UpdateNews(Guid id, [FromBody] News news)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid objeect sent from client");
                }
                service.Update(id, news);
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        } 

        // DELETE: api/News/deleteNews
        [HttpDelete("deleteNews/{id}")]
        public async Task<ActionResult<News>> DeleteNews(Guid id)
        {
            service.DeleteNews(id);

            return Ok();
        }
        private bool NewsExists(Guid id)
        {
            var news = service.GetNewsById(id);
            if (news == null)
                return false;
            return true;
        }

    }
}
