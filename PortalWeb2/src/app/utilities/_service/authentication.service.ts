import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { environment } from './../../../environments/environment';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {


  constructor(private router: Router, private http: HttpClient, private _MsAdalAngular6Service: MsAdalAngular6Service) {

  }
  logout() {
    localStorage.clear();
    this._MsAdalAngular6Service.logout();
    // this.router.navigate(['/login']);
  }

}
