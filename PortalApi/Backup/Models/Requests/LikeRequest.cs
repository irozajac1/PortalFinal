﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class LikeRequest
    {
        public string Email { get; set; }
        public Guid MessageId { get; set; }
    }
}
