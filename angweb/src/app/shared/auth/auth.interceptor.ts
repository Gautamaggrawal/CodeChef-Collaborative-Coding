import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AuthService } from '../service/auth/auth.service'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(public authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: req.headers.set("Accept", "application/json")
                                .set("Authorization", "Bearer " + localStorage.getItem('userToken'))
        });
        return next.handle(authReq);
    }
}