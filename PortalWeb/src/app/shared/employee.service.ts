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
  readonly rootURL = "https://localhost:5001/api";

  employee: Employee[];
  listOfLikes: UserLike[];
  constructor(private http: HttpClient) { }

  postUser(
    fromDataUser: any,
    file: File
  ): Observable<any> {

    var formData: FormData = new FormData();

    console.log(fromDataUser, file);

    if (file.name != null) {
      formData.append("EmployeePicture", file, file.name);
    }

    formData.append("FirstName", fromDataUser.Firstname);
    formData.append("LastName", fromDataUser.Lastname);
    formData.append("Email", fromDataUser.EmailEmployee);
    formData.append("Telephone", fromDataUser.Telephone);
    formData.append("Position", fromDataUser.Position);
    formData.append("Department", fromDataUser.Department);
    formData.append("StartOfWork", fromDataUser.StartOfWork.toUTCString());

    return this.http.post(this.rootURL + "/Employee/AddEmployee", formData);
  }

  getEmployees<Employee>() {
    return this.http.get(this.rootURL + "/Employee/getEmployees");
  }

  getImg(arg) {
    var x = this.rootURL + "/Employee/" + arg;
    return x;
  }

  deleteEmployee(id): Observable<any> {
    return this.http.delete(this.rootURL + "/Employee/deleteEmployee/" + id);
  }
  updateEmployee(employee: Employee, id: number) {
    return this.http.put(this.rootURL + "/Employee/Update/" + id, employee);
  }
}
