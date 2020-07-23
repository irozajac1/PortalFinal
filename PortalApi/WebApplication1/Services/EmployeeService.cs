using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
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
    public class EmployeeService : IEmployeeService
    {
        private readonly IPortalRepository<Employee> employeeRepository;
        public IHostingEnvironment _env;
        IConfiguration _configuration;

        public EmployeeService(IPortalRepository<Employee> employeeRepository, IHostingEnvironment env, IConfiguration configuration)
        {
            this.employeeRepository = employeeRepository;
            _env = env;
            _configuration = configuration;
        }

        public List<Employee> getAllEmployees()
        {
            return employeeRepository.IncludeAll().ToList();
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
                StartOfWork = employeeRequest.StartOfWork,
                ExtensionNumber = employeeRequest.ExtensionNumber
            };
            employeeRepository.Insert(employee);

        }
        public void DeleteEmployee(Guid id)
        {
            var employee = employeeRepository.GetById(id);
            employeeRepository.Delete(employee);
        }

        public void UpdateEmployee(Guid id,Employee employee)
        {
            var emp = employeeRepository.GetById(id);

            emp.Firstname = employee.Firstname;
            emp.Lastname = employee.Lastname;
            emp.Email = employee.Email;
            emp.Department = employee.Department;
            emp.Position = employee.Position;
            emp.StartOfWork = employee.StartOfWork;
            emp.ExtensionNumber = employee.ExtensionNumber;
            emp.Telephone = employee.Telephone;
            emp.EmployeePicture = employee.EmployeePicture;

            employeeRepository.Update(emp);
        }
    }
}

