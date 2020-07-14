using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class MessageRequest
    {
       
        public string TextMessage { get; set; }
        public string Email { get; set; }
        public List<IFormFile> Attachments { get; set; }
    }
}
