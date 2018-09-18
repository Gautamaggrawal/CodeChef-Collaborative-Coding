import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  doLogin(access_token) {
    localStorage.setItem('userToken',access_token);
    var returnUrl = localStorage.getItem('returnUrl');
    console.log("do login" + returnUrl);
    if(returnUrl != null){
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    }
    else
      this.router.navigate(['/home/list']);
  }
  
  isAuthenticated() {
    if(localStorage.getItem('userToken') != null) {
      return true;
    }else {
      return false;
    }
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/home']);
  }

}
