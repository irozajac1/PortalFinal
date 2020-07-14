using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebApplication1.Models;

using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using WebApplication1.Interface;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    //[Authorize(Roles = "Admin")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _service;

        public EmployeeController(IEmployeeService service)
        {
            _service = service;
        }

        // GET: api/Employee/getEmployees
        [HttpGet("getEmployees")]
        public List<Employee> GetAllEmployees()
        {
            return _service.getAllEmployees();
        }

        // GET: api/Employee/getEmployeeById
        [HttpGet("getEmployeeById")]
        public Employee GetEmployeeDetails(Guid id)
        {
            return _service.GetEmployeeById(id);
        }

        // POST: api/Employee/AddEmployee
        [HttpPost("AddEmployee")]
        public ActionResult AddEmployee(EmployeeRequest employee)
        {
            _service.PostEmployee(employee);

            return Ok();
        }



        // DELETE: api/Employee/deleteEmployee
        [HttpDelete("deleteEmployee/{id}")]
        public ActionResult DeleteEmployee(Guid id)
        {
            _service.DeleteEmployee(id);
            return Ok();
        }

        //PUT : api/Employee/Update
        [HttpPut("Update/{id}")]
        public IActionResult UpdateEmployee(Guid id, [FromBody] Employee employee)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid objeect sent from client");
                }
                _service.UpdateEmployee(id,employee);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error {ex.Message}");
            }
        }
    }
}
