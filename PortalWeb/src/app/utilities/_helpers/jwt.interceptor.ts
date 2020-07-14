import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthenticationService } from '../_service/authentication.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { mergeMap } from 'rxjs/operators';
import { AuthenticationService } from '../_service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        throw new Error("Method not implemented.");
    }

    //STARI SA JWT tokenom
    // constructor(private authenticationService: AuthenticationService) {
    // }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     // add authorization header with jwt token if available
    //     let currentUser = this.authenticationService.currentUserValue;
    //     if (currentUser && currentUser.token) {
    //         request = request.clone({
    //             setHeaders: {
    //                 Authorization: `Bearer ${currentUser.token}`
    //             }
    //         });
    //     }
    //     return next.handle(request);
    // }


    // NOVI SA AD JWT Tokenom


    // constructor(private adal: MsAdalAngular6Service) {
    // }
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     // get api url from adal config
    //     const resource = this.adal.GetResourceForEndpoint(req.url);
    //     if (!resource || !this.adal.isAuthenticated) {
    //         return next.handle(req);
    //     }

    //     // merge the bearer token into the existing headers
    //     return this.adal.acquireToken(resource).pipe(
    //         mergeMap((token: string) => {
    //             const authorizedRequest = req.clone({
    //                 headers: req.headers.set('Authorization', `Bearer ${token}`),
    //             });
    //             return next.handle(authorizedRequest);
    //         }));
    // }
    /**
     *
     */
    
    // constructor(private adal: MsAdalAngular6Service, private authenticationService: AuthenticationService) {
    // }
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     // get api url from adal config

    //     const resource = this.adal.GetResourceForEndpoint(req.url);
    //     if (!resource || !this.adal.isAuthenticated) {
    //         return next.handle(req);
    //     }

    //     // merge the bearer token into the existing headers
    //     return this.adal.acquireToken(resource).pipe(
    //         mergeMap((token: string) => {
    //             const authorizedRequest = req.clone({
    //                 headers: req.headers.set('Authorization', `Bearer ${token}`),
    //             });
    //             return next.handle(authorizedRequest);
    //         }));
    // }



}
