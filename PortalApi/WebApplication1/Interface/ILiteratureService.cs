using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;
using WebApplication1.Models.Requests;

namespace WebApplication1.Interface
{
    public interface ILiteratureService
    {
        List<Literature> GetAll();
        Literature GetById(Guid id);
        void PostLiterature(LiteratureRequest litRequest);
        void DeleteLiterature(Guid id);
        int GetNotApproved();
        FileStreamResult DownloadFile(Guid id);
    }
}
