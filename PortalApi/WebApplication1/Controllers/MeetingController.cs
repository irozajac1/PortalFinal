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
    public class MeetingController : ControllerBase
    {
        private readonly IPortalService service;

        public MeetingController(IPortalService service)
        {
            this.service = service;
        }

        [HttpGet("GetMeetings")]
        public List<Meetings> GetLinks()
        {
            return service.GetMeetings();
            
        }

        // GET: api/Meeting/5
        [HttpGet("GetMeeting/{id}")]
        public async Task<ActionResult<Meetings>> GetLink(Guid id)
        {
            var meet = service.GetMeeting(id);
            if (meet == null)
            {
                return NotFound();
            }
            return meet;
        }

        // POST: api/Meeting/PostLink
        [HttpPost("PostLink")]
        public async Task<ActionResult<Meetings>> PostLink([FromBody] Meetings meeting)
        {
            List<Meetings> meetings = service.GetMeetings();

            foreach(Meetings link in meetings)
            {
                service.DeleteLink(link.Id);
            }
            

            if (meeting == null)
            {
                return BadRequest();
            }
            service.PostLink(meeting);

            return Ok();
        }

        //PUT : api/Meeting/UpdateLink
        [HttpPut("UpdateLink/{id}")]
        public IActionResult UpdateLink(Meetings meeting, Guid id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid objeect sent from client");
                }
                service.UpdateLink(meeting, id);
                return Ok();
            }
            catch(Exception ex)
            {
                throw ex;
            }
            
        }

        //DELETE: api/Meeting/DeleteLink
        [HttpDelete("DeleteLink/{id}")]
        public async Task<ActionResult<Meetings>> DeleteLink(Guid id)
        {
            
            if (id == null)
            {
                return BadRequest();
            }
            service.DeleteLink(id);

            return Ok();
        }
    }
}