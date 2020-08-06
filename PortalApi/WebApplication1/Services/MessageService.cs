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

namespace WebApplication1.Services
{
    public class MessageService : IMessageService
    {
        private readonly IPortalRepository<Message> messageRepository;
        private readonly IPortalRepository<Attachment> attrepository;
        private readonly IPortalRepository<Comment> commentrepository;
        public IHostingEnvironment _env;
        IConfiguration _configuration;

        public MessageService(IPortalRepository<Comment> commentrepository, IPortalRepository<Message> messageRepository, IHostingEnvironment env, IConfiguration configuration, IPortalRepository<Attachment> attrepository)
        {
            this.messageRepository = messageRepository;
            _env = env;
            _configuration = configuration;
            this.attrepository = attrepository;
            this.commentrepository = commentrepository;
        }

        public void DeleteMessage(Guid id)
        {
            try
            {
                var message = messageRepository.IncludeAll().First(x => x.Id == id);
                message.ListOfComments.Clear();
                messageRepository.Delete(message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        public void DislikeMessage(LikeRequest likeRequest)
        {
            var message = messageRepository.GetById(likeRequest.MessageId);
            message.LikeCounter -= 1;
            messageRepository.Save();
            //var message = _context.Message.Include("UserLikeList").SingleOrDefault(x => x.MessageId == likeRequest.MessageId);
            //message.LikeCounter -= 1;
        }

        public FileStreamResult DownloadFile(Guid id)
        {
            var attachment = attrepository.GetById(id);
            var upload = _configuration.GetSection("Paths:Archive").Value + "\\Files\\";
            var filePath = Path.Combine(upload, attachment.AttachmentFileReference.ToString());

            //if (!System.IO.File.Exists(filePath))
            //    return NotFound();

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }

            memory.Position = 0;
            var type = GetType(filePath);
            return new FileStreamResult(memory, type){
                FileDownloadName = attachment.AttachmentFileName
            };
        }

        public List<Message> GetMessages()
        {
            return messageRepository.IncludeAll().ToList();
            //await _context.Message.OrderByDescending(p => p.MessageId).Include(x => x.ListOfComments).Include(x => x.Attachments).Include(x => x.UserLikeList).ToListAsync();
        }

        public int GetNotApprovedMessageCount()
        {
            //var message = _context.Message.Where(x => x.IsApproved == false && x.IsDeleted == false).Count();
            var messageNummber = messageRepository.GetAll().Where(x => x.IsApproved == false && x.IsDeleted == false).Count();
            return messageNummber;
        }

        public string GetType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }

        public void LikeMessage(LikeRequest likeRequest)
        {
            var message = messageRepository.GetById(likeRequest.MessageId);
            var isLiked = message.UserLikeList.Exists(x => x.Email == likeRequest.Email);

            if (!isLiked)
            {
                message.LikeCounter += 1;
                List<UserLike> usersWhoLiked = new List<UserLike>();
                UserLike userLike = new UserLike()
                {
                    Id = new Guid(),
                    Email = likeRequest.Email,
                    Liked = true,
                };
                usersWhoLiked.Add(userLike);
                message.UserLikeList = usersWhoLiked;
                messageRepository.Save();
            }
        }


        public bool MessageExists(Guid id)
        {
            var x = messageRepository.GetById(id);
            if (x == null)
                return false;
            return true;
            
        }

        public void SendMessage(MessageRequest messageRequest)
        {
            var attachmentList = new List<Attachment>();
            var folderPath = _configuration.GetSection("Paths:Archive").Value + "\\Upload\\";
            var files = messageRequest.Attachments;
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
                    attachmentList.Add(att);
                }

            }
            var message = new Message
            {
                Attachments = attachmentList,
                Email = messageRequest.Email,
                IsApproved = false,
                IsDeleted = false,
                TextMessage = messageRequest.TextMessage,
                LikeCounter = 0,
                UserLikeList = new List<UserLike>()
            };
            messageRepository.Insert(message);
        }

        public void UpdateMessage(Guid id, Message message)
        {
            var messageNew = messageRepository.GetById(id);

            messageNew.TextMessage = message.TextMessage;
            messageNew.Attachments = message.Attachments;
            messageNew.IsApproved = message.IsApproved;

            messageRepository.Update(messageNew);
        }

        public List<Comment> GetAllComments()
        {
            return commentrepository.GetAll().ToList();
        }

        public Comment GetComment(Guid id)
        {
            var comment = commentrepository.GetById(id);

            return comment;
        }

        public void PostComment(Guid messageId, Comment comment)
        {
            var message = messageRepository.GetById(messageId);

            if(message != null)
            {
                comment.MessageId = messageId;
                commentrepository.Insert(comment);
            }
        }

        public void DeleteComment(Guid id)
        {
            var comment = commentrepository.GetById(id);
            commentrepository.Delete(comment);

        }
    }
}
