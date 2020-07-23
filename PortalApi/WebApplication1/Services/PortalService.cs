using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
    public class PortalService : IPortalService
    {
        private readonly IPortalRepository<About> aboutrepository;
        private readonly IPortalRepository<Documentation> documentationrepository;
        private readonly IPortalRepository<News> newsrepository;
        private readonly IPortalRepository<Attachment> attachrepository;
        private readonly IPortalRepository<Meetings> meetingsrepository;
        public IHostingEnvironment _env;
        IConfiguration _configuration;

        public PortalService(IPortalRepository<Meetings> meetingsrepository ,IPortalRepository<Attachment> attachrepository,IPortalRepository<About> aboutrepository, IPortalRepository<Documentation> documentationrepository, IPortalRepository<News> newsrepository, IHostingEnvironment _env, IConfiguration _configuration)
        {
            this.aboutrepository = aboutrepository;
            this.documentationrepository = documentationrepository;
            this.newsrepository = newsrepository;
            this._env = _env;
            this._configuration = _configuration;
            this.attachrepository = attachrepository;
            this.meetingsrepository = meetingsrepository;
        }

        public List<About> GetAllText()
        {
            return aboutrepository.GetAll().ToList();
        }

        public About GetTextByID(Guid id)
        {
            return aboutrepository.GetById(id);
        }
        public void SetAboutText( About tekst)
        {
            List<About> abouts = aboutrepository.GetAll().ToList();
            foreach(About x in abouts)
            {
                aboutrepository.Delete(x);
            }

            aboutrepository.Insert(tekst);
        }

        public List<Attachment> getAllFiles()
        {
            return attachrepository.GetAll().ToList();
        }

        public Attachment getFileById(Guid id)
        {
            return attachrepository.GetById(id);
        }
        public void PostFile(IFormFile myfile)
        {
            var folderPath = _configuration.GetSection("Paths:Archive").Value + "\\Files\\";

            if (myfile != null)
            {
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                var fileNameWithGuid = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(myfile.FileName);
                var fileName = myfile.FileName;
                var fullPath = Path.Combine(folderPath, fileNameWithGuid);

                using (FileStream fileStream = System.IO.File.Create(folderPath + fileNameWithGuid))
                {
                    myfile.CopyTo(fileStream);
                }
                var doc = new Attachment
                {
                    AttachmentFileName = fileName,
                    AttachmentFileReference = fileNameWithGuid
                };
                attachrepository.Insert(doc);
            }
            
        }
        public void deleteTextAbout(Guid id)
        {
            var a = aboutrepository.GetById(id);
            aboutrepository.Delete(a);
        }

        public void deleteFile(Attachment myfile)
        {
            attachrepository.Delete(myfile);
        }
        public List<Documentation> GetAllDocumentation()
        {
            return documentationrepository.GetAll().ToList();
        }

        public Documentation getById(Guid id)
        {
            return documentationrepository.GetById(id);
        }

        public List<Documentation>getByGroupName(string group)
        {
            return documentationrepository.FindByCondition(e => e.Group == group);
        }

        public void addDocumentation (Documentation documentation)
        {
            documentationrepository.Insert(documentation);
        }

        public void deleteDocumentation(Guid id)
        {
            var documentation = documentationrepository.GetById(id);
            documentationrepository.Delete(documentation);
        }
        public void deleteAllGroup(string group)
        {
            var doc = documentationrepository.FindByCondition(e => e.Group == group);
            foreach(Documentation document in doc)
            {
                documentationrepository.Delete(document);
            }
        }
        public List<News> GetAllNews()
        {
            return newsrepository.GetAll().ToList();
        }

        public Meetings GetMeeting(Guid id)
        {
            return meetingsrepository.GetById(id);
        }

        public List<Meetings> GetMeetings()
        {
            return meetingsrepository.GetAll().ToList();
        }


        public void PostLink(Meetings meeting)
        {
            meetingsrepository.Insert(meeting);
        }

        public void DeleteLink(Guid id)
        {
            var x = meetingsrepository.GetById(id);
            meetingsrepository.Delete(x);
        }

        public void UpdateLink(Meetings m, Guid id)
        {
           var meeting = meetingsrepository.GetById(id);
            meeting.Url = m.Url;

            meetingsrepository.Update(meeting);
        }

        public void UpdateDoc(Documentation doc, Guid id)
        {
            var document = documentationrepository.GetById(id);
            document.Link = doc.Link;
            document.Group = doc.Group;
            document.Title = doc.Title;

            documentationrepository.Update(document);
        }
    }
}
