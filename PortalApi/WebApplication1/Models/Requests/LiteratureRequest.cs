using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models.Requests
{
    public class LiteratureRequest
    {
        public string Title { get; set; }
        public string Link { get; set; }
        public string Group { get; set; }
        public List<IFormFile> Files { get; set; }
        public string Email { get; set; }
    }
}
