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
    public class AttachmentController : ControllerBase
    {
        private readonly IPortalService _service;

        public AttachmentController(IPortalService service)
        {
            _service = service;
        }


        // GET: api/Attachment/files
        [HttpGet("files")]
        public List<Attachment> getAll()
        {
            return _service.getAllFiles();
        }

        // GET: api/Attachment/getFileById
        [HttpGet("getFileById")]
        public Attachment GetById(Guid id)
        {
            return _service.getFileById(id);
        }

        // POST: api/Attachment/sendFile
        [HttpPost("sendFile/{id}")]
        public void PostFile(IFormFile myfile)
        {
            _service.PostFile(myfile);
        }


        //DELETE: api/Attachment/deleteFile
        [HttpDelete("deleteFile")]
        public void DeleteFile(Attachment myfile)
        {
            _service.deleteFile(myfile);
        }
    }
}