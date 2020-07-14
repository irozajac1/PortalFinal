using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Documentation
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Group { get; set; }
        public string Link { get; set; }
    }
}
