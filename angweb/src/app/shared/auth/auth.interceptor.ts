import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthService } from '../service/auth/auth.service'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(
        private router: Router,
        public authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isAuthenticated()) {
            const clonedreq = req.clone({
                headers: req.headers.set("Accept", "application/json")
                                    .set("Authorization", "Bearer " + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq).pipe(
                tap(
                succ => { },
                err => {
                    if (err.status === 401)
                        this.router.navigateByUrl('/login');
                }
                ));
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }
}