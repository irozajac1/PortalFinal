using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Interface;
using WebApplication1.Models;
using WebApplication1.Models.Requests;

namespace WebApplication1.Services
{
    public class LiteratureService : ILiteratureService
    {
        public IHostingEnvironment _env;
        IConfiguration _configuration;
        public IPortalRepository<Literature> repository;
        public IPortalRepository<Attachment> attrepository;

        public LiteratureService(IPortalRepository<Attachment> attrepository, IHostingEnvironment env, IConfiguration configuration, IPortalRepository<Literature> repository)
        {
            _env = env;
            _configuration = configuration;
            this.repository = repository;
            this.attrepository = attrepository;
        }

        public void DeleteLiterature(Guid id)
        {
            var literature = repository.GetById(id);
            repository.Delete(literature);
        }

        public List<Literature> GetAll()
        {
            return repository.GetAll().ToList();
        }


        public Literature GetById(Guid id)
        {
            return repository.GetById(id);
        }

        public void PostLiterature(LiteratureRequest literatueRequest)
        {
            var attachment = new Attachment();
            var folderPath = _configuration.GetSection("Paths:Archive").Value + "\\Literature\\";
            var files = literatueRequest.Files;
            if (files != null)
            {
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                foreach (var myFile in files)
                {
                    var fileNameWithGuid = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(myFile.FileName);
                    var fileName = myFile.FileName;
                    var fullPath = Path.Combine(folderPath, fileNameWithGuid);

                    using (FileStream fileStream = System.IO.File.Create(folderPath + fileNameWithGuid))
                    {
                        myFile.CopyTo(fileStream);
                    }

                    var att = new Attachment
                    {
                        AttachmentFileName = fileName,
                        AttachmentFileReference = fileNameWithGuid
                    };
                    attachment = att;
                }

            }
            var literature = new Literature
            {
                Files = attachment,
                Email = literatueRequest.Email,
                IsApproved = false,
                IsDeleted = false,
                Title = literatueRequest.Title,
                Link = literatueRequest.Link,
                Group = literatueRequest.Group,
               
            };
            repository.Insert(literature);
        }

        public int GetNotApproved()
        {
            var nummber = repository.GetAll().Where(x => x.IsApproved == false && x.IsDeleted == false).Count();
            return nummber;
        }

        public FileStreamResult DownloadFile(Guid id)
        {
            var attachment = attrepository.GetById(id);
            var upload = _configuration.GetSection("Paths:Archive").Value + "\\Files\\";
            var filePath = Path.Combine(upload, attachment.AttachmentFileReference.ToString());

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }

            memory.Position = 0;
            var type = GetType(filePath);
            return new FileStreamResult(memory, type)
            {
                FileDownloadName = attachment.AttachmentFileName
            };
        }
        private string GetType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }

        public void UpdateLiterature(Literature l, Guid id)
        {
            var literature = repository.GetById(id);

            literature.Group = l.Group;
            literature.Link = l.Link;
            literature.Title = l.Title;
            literature.Files = l.Files;

            repository.Update(literature);
        }
    }
}
