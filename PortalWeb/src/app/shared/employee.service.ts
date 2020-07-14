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
  // readonly rootURL = "https://pdp.mibo.ba:44390/api";
  readonly rootURL = "https://localhost:44390/api";

  employee: Employee[];
  listOfLikes: UserLike[];
  constructor(private http: HttpClient) { }

  postUser(
    fromDataUser: Employee,
    file: File
  ): Observable<any> {

    var formData: FormData = new FormData();

    formData.append("EmployeePicture", file, file.name);

    formData.append("FirstName", fromDataUser.Firstname);
    formData.append("LastName", fromDataUser.Lastname);
    formData.append("Email", fromDataUser.Email);
    formData.append("Telephone", fromDataUser.Telephone);

    return this.http.post(this.rootURL + "/Employee/AddEmployee", formData);
  }

  getEmployees<Employee>() {
    return this.http.get(this.rootURL + "/Employee/getEmployees");
  }

  deleteEmployee(id) {
    this.http.delete(this.rootURL + "/Employee/deleteEmployee/" + id).subscribe();
    window.location.reload();
  }
  updateEmployee(employee: Employee, id: number) {
    return this.http.put(this.rootURL + "/Employee/Update/" + id, employee).subscribe();
  }
}
