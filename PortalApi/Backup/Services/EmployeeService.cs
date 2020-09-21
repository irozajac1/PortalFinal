using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IPortalRepository<Employee> employeeRepository;
        public IHostingEnvironment _env;
        public IPortalRepository<Attachment> attrepository;
        IConfiguration _configuration;

        public EmployeeService(IPortalRepository<Attachment> attrepository, IPortalRepository<Employee> employeeRepository, IHostingEnvironment env, IConfiguration configuration)
        {
            this.employeeRepository = employeeRepository;
            _env = env;
            _configuration = configuration;
            this.attrepository = attrepository;
        }

        public List<Employee> getAllEmployees()
        {
            var x = employeeRepository.IncludeAll().ToList();
            return x;
        }

        public Employee GetEmployeeById(Guid id)
        {
            return employeeRepository.GetById(id);
        }
        public void PostEmployee(Employee emp)
        {
            employeeRepository.Insert(emp);
        }

        public void PostEmployee(EmployeeRequest employeeRequest)
        {
            Employee employee = new Employee();
            var doc = new Attachment();
            var folderPath = _configuration.GetSection("Paths:Archive").Value + "\\Employees\\";
            var employePicture = employeeRequest.EmployeePicture;

            if (employePicture != null)
            {
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                var fileNameWithGuid = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(employePicture.FileName);
                var fileName = employePicture.FileName;
                var fullPath = Path.Combine(folderPath, fileNameWithGuid);

                using (FileStream fileStream = System.IO.File.Create(folderPath + fileNameWithGuid))
                {
                    employePicture.CopyTo(fileStream);
                }
                doc = new Attachment
                {
                    AttachmentFileName = fileName,
                    AttachmentFileReference = fileNameWithGuid
                };

            }
            employee = new Employee
            {
                EmployeePicture = doc,
                Firstname = employeeRequest.Firstname,
                Lastname = employeeRequest.Lastname,
                Email = employeeRequest.Email,
                Telephone = employeeRequest.Telephone,
                Department = employeeRequest.Department,
                Position = employeeRequest.Position,
                StartOfWork = Convert.ToDateTime(employeeRequest.StartOfWork),
                ExtensionNumber = employeeRequest.ExtensionNumber
            };
            employeeRepository.Insert(employee);

        }
        public void DeleteEmployee(Guid id)
        {
            var employee = employeeRepository.GetById(id);
            employeeRepository.Delete(employee);
        }

        public void UpdateEmployee(Guid id, EmployeeRequest employeeRequest)
        {
            Employee employee = new Employee();
            var doc = new Attachment();
            var folderPath = _configuration.GetSection("Paths:Archive").Value + "\\Employees\\";
            var employePicture = employeeRequest.EmployeePicture;

            if (employePicture != null)
            {
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                var fileNameWithGuid = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(employePicture.FileName);
                var fileName = employePicture.FileName;
                var fullPath = Path.Combine(folderPath, fileNameWithGuid);

                using (FileStream fileStream = System.IO.File.Create(folderPath + fileNameWithGuid))
                {
                    employePicture.CopyTo(fileStream);
                }
                doc = new Attachment
                {
                    AttachmentFileName = fileName,
                    AttachmentFileReference = fileNameWithGuid
                };
            }

            var emp = employeeRepository.GetById(id);

            if (employePicture != null)
            {
                emp.EmployeePicture = doc;

            }

            emp.Firstname = employeeRequest.Firstname;
            emp.Lastname = employeeRequest.Lastname;
            emp.Email = employeeRequest.Email;
            emp.Department = employeeRequest.Department;
            emp.Position = employeeRequest.Position;
            emp.StartOfWork = Convert.ToDateTime(employeeRequest.StartOfWork);
            emp.ExtensionNumber = employeeRequest.ExtensionNumber;
            emp.Telephone = employeeRequest.Telephone;

            employeeRepository.Update(emp);
        }

        public FileStreamResult DownloadFile(Guid id)
        {
            var attachment = attrepository.GetById(id);
            var upload = _configuration.GetSection("Paths:Archive").Value + "\\Employees\\";
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
    }
}

