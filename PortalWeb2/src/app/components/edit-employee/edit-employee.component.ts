import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Employee } from 'src/app/shared/message-detail.model';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { faWindowClose } from "node_modules/@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  recvData: any;
  selectedFile: File;
  faWindowClose = faWindowClose;
  editEmployeeForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private formBuilder: FormBuilder, 
  private dialogRef: MatDialogRef<EditEmployeeComponent>,
  public toastr: ToastrService, 
  public EmployeeService: EmployeeService
  ) {
    this.recvData = data;
  }

  ngOnInit() {
    this.editEmployeeForm = this.formBuilder.group({
      Email: [this.recvData.emp.Email],
      Firstname: [this.recvData.emp.Firstname],
      Lastname: [this.recvData.emp.Lastname],
      Telephone: [this.recvData.emp.Telephone],
      ExtensionNumber: [this.recvData.emp.ExtensionNumber],
      StartOfWork: [this.recvData.emp.StartOfWork],
      Department: [this.recvData.emp.Department],
      Position: [this.recvData.emp.Position],
      EmployeePicture: [],
    });
    console.log(this.recvData);
  }

  editEmployee(id) {
    if (this.editEmployeeForm.invalid) {
      return;
    }
    this.EmployeeService.updateEmployee(this.editEmployeeForm.value, this.selectedFile, this.recvData.emp.StartOfWork, id).subscribe(res => {
      this.EmployeeService.getEmployees();
      this.toastr.success("Uspješno");
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
      this.dialogRef.close();
  }



  uploadEmployeePicture(e) {
    if (e.length != 0) {
      this.selectedFile = e[0];
    }
    e = null;
  }

  removeEmpPic() {
    this.selectedFile = null;
  }

}
