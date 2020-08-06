import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { Employee } from 'src/app/shared/message-detail.model';
import { MatDialog } from "@angular/material";
import {
  faTrash,
  faEdit
} from "node_modules/@fortawesome/free-solid-svg-icons";
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;
  getEmail = 'muhamed.skikic@mibo.ba';
  ArrayOfFiles: any[] = [];

  constructor(public EmployeeService: EmployeeService, public dialog: MatDialog, public toastr: ToastrService) {
  }

  Employees: Employee[];

  ngOnInit() {
    this.EmployeeService.getEmployees().subscribe(data => { this.Employees = data as Employee[]; });
  }

  uploadFileSave(e) {
    if (e.length != 0) {
      this.ArrayOfFiles.push(e[0]);
    }
  }

  deleteDocument(id) {
    return this.EmployeeService.deleteEmployee(id).subscribe(res => {
      this.toastr.success("Uspješno");
      location.reload();
      this.EmployeeService.getEmployees().subscribe(data => { this.Employees = data as Employee[]; });
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
  }

  editEmployee(emp): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: "800px",
      data: {
        emp
      }
    });
  }
}

