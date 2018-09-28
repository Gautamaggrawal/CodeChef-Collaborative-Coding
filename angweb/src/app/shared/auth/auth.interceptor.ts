import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AuthService } from '../service/auth/auth.service'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(
        private router: Router,
        private authService: AuthService) { }
    //intercept the request to check if authorized or handle error codes
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(this.addAuthenticationToken(req)).pipe(catchError(err =>{
            if(err.status == 401){
                this.authService.getAccessToken().subscribe(res=>{
                    if(res.status == 403){
                        this.authService.Logout();
                        return throwError(err);
                    }
                    this.authService.setUserToken(res);
                    this.router.navigate(['home/school']);
                    return next.handle(this.addAuthenticationToken(req));
                });
            }
            this.authService.Logout();
            return throwError(err);
        }));
    }

    //add authorization to request
    addAuthenticationToken(request) {
        return request.clone({
            headers: request.headers.set("Accept", "application/json")
                                .set("Authorization", "Bearer " + localStorage.getItem('userToken'))
        });
    }
}