using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models.Requests
{
    public class AboutRequest
    {
        public string AboutText { get; set; }
        public List<IFormFile> File { get; set; }
    }
}
