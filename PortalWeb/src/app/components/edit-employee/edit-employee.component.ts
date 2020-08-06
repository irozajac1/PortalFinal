import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Employee } from 'src/app/shared/message-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  recvData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, public toastr: ToastrService, public EmployeeService: EmployeeService
  ) {
    this.recvData = data;
  }

  editEmployeeForm: FormGroup;

  ngOnInit() {
    this.editEmployeeForm = new FormGroup({
      Firstname: new FormControl(this.recvData.emp.Firstname),
      Lastname: new FormControl(this.recvData.emp.Lastname),
      Department: new FormControl(this.recvData.emp.Department),
      Position: new FormControl(this.recvData.emp.Position),
      EndOfWork: new FormControl(this.recvData.emp.StartOfWork),
      StartOfWork: new FormControl(this.recvData.emp.EndOfWork),
      Telephone: new FormControl(this.recvData.emp.Telephone),
      Email: new FormControl(this.recvData.emp.Email),
    }
    );
  }

  editEmployee(id) {
    return this.EmployeeService.updateEmployee(this.editEmployeeForm.value as Employee, id).subscribe(res => {
      this.EmployeeService.getEmployees();
      this.toastr.success("Uspješno");
      location.reload();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
  }

}
