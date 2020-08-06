using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class EmployeeRequest
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Department { get; set; }
        public string Position { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string ExtensionNumber { get; set; }
        public string StartOfWork { get; set; }
        public string EndOfWork { get; set; }
        public IFormFile EmployeePicture { get; set; }
    }
}
