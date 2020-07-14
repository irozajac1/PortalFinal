import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';;
import { MsAdalAngular6Service, MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthenticationService } from '../_service/authentication.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard {
    //private adalSvc;
    // constructor(private router: Router, private authenticationService: AuthenticationService, 
    //      private adal: MsAdalAngular6Service) {
    // }

  
}

