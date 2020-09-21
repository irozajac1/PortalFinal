using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutController : ControllerBase
    {
        private readonly IPortalService _service;

        public AboutController(IPortalService service)
        {
            _service = service;
        }

        // GET: api/About/about
        [HttpGet("about")]
        public List<About> GetAbouts()
        {
            return _service.GetAllText();
        }

        // GET: api/About/getAboutById
        [HttpGet("getAboutById")]
        public About GetAboutById(Guid id)
        {
            return _service.GetTextByID(id);
        }

        // POST: api/About/SetText
        [HttpPost("SetText")]
        public IActionResult PostText(About tekst)
        {
            _service.SetAboutText(tekst);
            return Ok();
        }

        //DELETE: api/About/deleteText
        [HttpDelete("deleteText")]
        public void DeleteText(Guid id)
        {
            _service.deleteTextAbout(id);
        }
    }
}