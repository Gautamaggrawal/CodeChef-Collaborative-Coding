import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  doLogin(access_token) {
    localStorage.setItem('userToken',access_token);
    this.router.navigate(['/home']);
  }
  
  isAuthenticated() {
    if(localStorage.getItem['userToken']) {
      return true;
    }else {
      return false;
    }
  }

  
}
