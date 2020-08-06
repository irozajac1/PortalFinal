using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using WebApplication1.Database;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService service;

        public MessagesController(IMessageService service)
        {
            this.service = service;
        }

        // GET: api/Messages
        [HttpGet]
        public async Task<ActionResult<IList<Message>>> GetMessage()
        {
            return  service.GetMessages();
        }

        // GET: api/Messages/5
        [HttpGet("notapprovedmessagescount")]
        public IActionResult GetNotApprovedMessageCount()
        {
            var message = service.GetNotApprovedMessageCount();

            return Ok(message);
        }

        // PUT: api/Messages/update
        [HttpPut("update/{id}")]
        public async Task<IActionResult> PutMessage(Guid id, Message message)
        {
            service.UpdateMessage(id, message);
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult Download(Guid id)
        {
            return service.DownloadFile(id);
        }

        // POST: api/Messages/SendMessage
        [HttpPost("SendMessage")]
        public IActionResult PostMessage([FromForm] MessageRequest request)
        {
            service.SendMessage(request);
            return Ok();
        }
        [HttpPost("LikeMessage")]
        public async void LikeMessage([FromBody] LikeRequest likeRequest)
        {
            service.LikeMessage(likeRequest);

        }

        [HttpPut("DislikeMessage")]
        public async void DislikeMessage([FromBody] LikeRequest likeRequest)
        {
            service.DislikeMessage(likeRequest);
        }

        // DELETE: api/Messages/deleteMessage/5
        [HttpDelete("deleteMessage/{id}")]
        public async Task<ActionResult<Message>> DeleteMessage(Guid id)
        {
            service.DeleteMessage(id);

            return Ok();
        }


    }
}
