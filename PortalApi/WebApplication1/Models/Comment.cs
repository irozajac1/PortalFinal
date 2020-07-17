using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Comment
    {
        public Guid CommentId { get; set; }
        
        public string TextComment { get; set; }
        public DateTime CurrentDateTime { get; set; }
        public Comment()
        {
            CurrentDateTime = DateTime.Now;
        }
        public string Email { get; set; }
        public Guid MessageId { get; set; }
    }
}
