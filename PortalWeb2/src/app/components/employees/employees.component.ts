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
import {
  DomSanitizer, SafeResourceUrl, SafeUrl
} from '@angular/platform-browser';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;
  getEmail = localStorage.getItem('upn');
  ArrayOfFiles: any[] = [];
  isAdmin: boolean = false;

  constructor(public EmployeeService: EmployeeService, public dialog: MatDialog, public toastr: ToastrService, private sanitizer: DomSanitizer) {
  }

  Employees: Employee[];

  ngOnInit() {
    this.EmployeeService.getEmployees().subscribe(data => {
      this.Employees = data as Employee[];
    });
    this.checkAdmin();
  }

  checkAdmin() {
    if (this.getEmail == "muhamed.skikic@mibo.ba" || this.getEmail == "almedina.karalic@mibo.ba" || this.getEmail == "edim.hadzic@mibo.ba") {
      this.isAdmin = true;
    }
  }

  uploadFileSave(e) {
    if (e.length != 0) {
      this.ArrayOfFiles.push(e[0]);
    }
  }

  deleteDocument(id) {
    return this.EmployeeService.deleteEmployee(id).subscribe(res => {
      this.toastr.success("Uspješno");
      this.EmployeeService.getEmployees().subscribe(data => { this.Employees = data as Employee[]; });
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
  }

  getEmployeeImages(arg) {
    return this.EmployeeService.getEmployeeImages(arg);
  }

  editEmployee(emp): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: "800px",
      data: {
        emp
      }
    });
  }

  openEmail(email) {
    window.location.href = "mailto:" + email;
  }
}

