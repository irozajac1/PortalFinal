using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Attachment
    {
        public Guid AttachmentId { get; set; }
        public string AttachmentFileName { get; set; }
        public string AttachmentFileReference { get; set; }
        public Guid? MessageId { get; set; }
    }
}
