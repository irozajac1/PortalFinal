using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Interface;
using WebApplication1.Models;
using WebApplication1.Models.Requests;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiteratureController : ControllerBase
    {
        private readonly ILiteratureService service;

        public LiteratureController(ILiteratureService literatureService)
        {
            this.service = literatureService;
        }
        // GET: api/Literature/literature
        [HttpGet]
        public async Task<ActionResult<IList<Literature>>> GetLiterature()
        {
            return service.GetAll();
        }

        // GET: api/Literature/literatureById
        [HttpGet("literatureById")]
        public async Task<ActionResult<Literature>> GetLiteratureById(Guid id)
        {
            return service.GetById(id);
        }

        // GET: api/Literature/notapproved
        [HttpGet("notapproved")]
        public IActionResult GetNotApproved()
        {
            var literature = service.GetNotApproved();

            return Ok(literature);
        }

        //[HttpGet("{id}")]
        public IActionResult Download(Guid id)
        {
            return service.DownloadFile(id);
        }

        // POST: api/Literature/SendLiterature
        [HttpPost("SendLiterature")]
        public IActionResult PostLiterature([FromForm] LiteratureRequest  request)
        {
            service.PostLiterature(request);
            return Ok();
        }

        //DELETE : api/Literature/deleteLiterature
        [HttpDelete("deleteLiterature")]
        public IActionResult Delete(Guid id)
        {
            service.DeleteLiterature(id);
            return Ok();
        }
    }
}