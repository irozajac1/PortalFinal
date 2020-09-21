using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class News
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime DateNow { get; set; }
        public News()
        {
            DateNow = DateTime.Now;
        }

        public DateTime DateOfEvent { get; set; }
    }
}
