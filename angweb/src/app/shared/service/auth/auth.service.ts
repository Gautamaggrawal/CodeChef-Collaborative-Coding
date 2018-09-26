import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  isLoggedInChanged : Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router,
    private http: HttpClient ) { }

  doLogin(access_token) {
    this.loggedIn(true);
    this.setUserToken(access_token);
    var returnUrl = localStorage.getItem('returnUrl');
    console.log("do login" + returnUrl);
    if(returnUrl != null){
      console.log("return url called" + returnUrl);
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    }
    else
      this.router.navigate(['home/school']);
  }
  
  isAuthenticated() {
    if(localStorage.getItem('userToken') != null) {
      this.loggedIn(true);
      return true;
    }else {
      this.loggedIn(false);
      return false;
    }
  }

  setUserToken(token){
    this.loggedIn(true);
    localStorage.setItem('userToken',token);
  }

  Logout() {
    this.loggedIn(false);
    localStorage.removeItem('userToken');
    this.router.navigate(['']);
  }

  getAccessToken(): Observable<any> {
    var access_token = localStorage.getItem('userToken');
    const params = { params: new HttpParams().set('access_token', access_token)};
    return this.http.get<any>('http://localhost:3000/oauth/access_token',params);
  }

  loggedIn(data):void{
    this.isLoggedIn = data;
    this.isLoggedInChanged.next(this.isLoggedIn);
  }
}
