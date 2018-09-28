import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  isLoggedInChanged : Subject<boolean> = new Subject<boolean>(); //subject for checking if user is logged In across diffrent stages

  constructor(private router: Router,
    private http: HttpClient ) { }
  

  // does login and check if return url present then redirect to return url
  doLogin(access_token) {
    this.loggedIn(true);
    this.setUserToken(access_token);
    var returnUrl = localStorage.getItem('returnUrl');
    if(returnUrl != null){
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    }
    else
      this.router.navigate(['home/school']);
  }
  
  // checks if token present at client local storage
  isAuthenticated() {
    if(localStorage.getItem('userToken') != null) {
      this.loggedIn(true);
      return true;
    }else {
      this.loggedIn(false);
      return false;
    }
  }

  //save token to local storage
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

  //set subject that user is loggedIn or Logged Out 
  loggedIn(data):void{
    this.isLoggedIn = data;
    this.isLoggedInChanged.next(this.isLoggedIn);
  }
}
