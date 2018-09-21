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

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(this.addAuthenticationToken(req)).pipe(catchError(err =>{
            if(err.status == 401){
                this.authService.getAccessToken().subscribe(res=>{
                    console.log("401 is here");
                    console.log("401 caught "+ res);
                    if(res.status == 403){
                        this.authService.Logout();
                        return throwError(err);
                    }
                    this.authService.setUserToken(res);
                    console.log(req);
                    this.router.navigate(['home/school']);
                    return next.handle(this.addAuthenticationToken(req));
                });
            }
            this.authService.Logout();
            return throwError(err);
        }));
    }

    addAuthenticationToken(request) {
        return request.clone({
            headers: request.headers.set("Accept", "application/json")
                                .set("Authorization", "Bearer " + localStorage.getItem('userToken'))
        });
    }
}