using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Message
    {
        public Guid Id  {get; set; }
        public string TextMessage { get; set; }
        public DateTime CurrentDate { get; set; }
        public List<Comment> ListOfComments { get; set; }
        public Message()
        {
            CurrentDate = DateTime.Now;
        }
        public string Email { get; set; }
        public bool IsApproved { get; set; }
        public bool IsDeleted { get; set; }
        public List<Attachment> Attachments { get; set; }
        public int LikeCounter { get; set; }
        public List<UserLike> UserLikeList {get; set;}
    }
}
