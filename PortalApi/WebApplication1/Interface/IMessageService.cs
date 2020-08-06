using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Interface
{
    public interface IMessageService
    {
        List<Message> GetMessages();
        int GetNotApprovedMessageCount();
        void UpdateMessage(Guid id, Message message);
        FileStreamResult DownloadFile(Guid id);
        string GetType(string path);
        void SendMessage(MessageRequest messageRequest);
        void LikeMessage(LikeRequest likeRequest);
        void DislikeMessage(LikeRequest likeRequest);
        void DeleteMessage(Guid id);
        bool MessageExists(Guid id);
        List<Comment> GetAllComments();
        Comment GetComment(Guid id);
        void PostComment(Guid messageId, Comment comment);
        void DeleteComment(Guid id);

    }
}
