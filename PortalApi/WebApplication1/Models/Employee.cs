using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Department { get; set; }
        public string Position { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public DateTime StartOfWork { get; set; }
        public DateTime EndOfWork { get; set; }
        public Attachment EmployeePicture { get; set; } 
    }
}
