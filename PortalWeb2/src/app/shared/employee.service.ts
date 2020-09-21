import { Injectable } from '@angular/core';
import { Employee, UserLike } from './message-detail.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  fromDataUser: Employee;
  fromDataLike: UserLike;
  readonly rootURL = "https://pdp.mibo.ba:5001/api";

  employee: Employee[];
  listOfLikes: UserLike[];
  constructor(private http: HttpClient) { }

  postUser(
    fromDataUser: any,
    file: File
  ): Observable<any> {

    var formData: FormData = new FormData();

    if (file.name != null) {
      formData.append("EmployeePicture", file, file.name);
    }

    console.log(fromDataUser.StartOfWork);

    formData.append("FirstName", fromDataUser.Firstname);
    formData.append("LastName", fromDataUser.Lastname);
    formData.append("Email", fromDataUser.EmailEmployee);
    formData.append("Telephone", fromDataUser.Telephone);
    formData.append("Position", fromDataUser.Position);
    formData.append("Department", fromDataUser.Department);
    formData.append("ExtensionNumber", fromDataUser.ExtensionNumber);
    formData.append("StartOfWork", fromDataUser.StartOfWork.toUTCString());
    return this.http.post(this.rootURL + "/Employee/AddEmployee/", formData);
  }

  getEmployees<Employee>(): Observable<any> {
    return this.http.get(this.rootURL + "/Employee/getEmployees/");
  }

  deleteEmployee(id): Observable<any> {
    return this.http.delete(this.rootURL + "/Employee/deleteEmployee/" + id);
  }
  updateEmployee(employee: any, file: File, recvDate: any, id: string) {
    console.log(employee.StartOfWork)

    var formData: FormData = new FormData();

    if (file != null) {
      formData.append("EmployeePicture", file, file.name);
    }

    formData.append("FirstName", employee.Firstname);
    formData.append("LastName", employee.Lastname);
    formData.append("Email", employee.Email);
    formData.append("Telephone", employee.Telephone);
    formData.append("Position", employee.Position);
    formData.append("Department", employee.Department);
    if (employee.StartOfWork != recvDate) {
      formData.append("StartOfWork", employee.StartOfWork.toUTCString());
    }
    else {
      formData.append("StartOfWork", employee.StartOfWork);
    }
    formData.append("ExtensionNumber", employee.ExtensionNumber);

    return this.http.put(this.rootURL + "/Employee/Update/" + id, formData);
  }

  getEmployeeImages(arg) {
    var imagePath = this.rootURL + "/Employee/" + arg;
    return imagePath;
  }
}
