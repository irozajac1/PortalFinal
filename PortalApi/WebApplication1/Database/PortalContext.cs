using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Database
{
    public class PortalContext : DbContext
    {
        public PortalContext(DbContextOptions<PortalContext> options): base(options) { }

        public DbSet<About> Abouts { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Documentation> Documents { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Literature> Literatures { get; set; }
        public DbSet<Meetings> Meetings { get; set; }
        public DbSet<Attachment> Attachment { get; set; }
        public DbSet<Message> Message { get; set; }
        public DbSet<Comment> Comment { get; set; }

    }
}
