import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment';
import { UserService } from '../shared/service/user.service';
import { AuthService } from '../shared/service/auth/auth.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;
  access_token: string;
  CodeChefloginUrl: string;
  isLoggedIn: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    var returnUrl = this.route.snapshot.queryParams['returnUrl'];
    // if returnUrl present save to localStorage
    if(returnUrl != undefined)
      localStorage.setItem('returnUrl', returnUrl);
    
    if(this.isLoggedIn){
      console.log('logged In');
      this.getCurrretUser();
    }else{
      this.checkAccessToken();
    }
  }

  Logout() {
    this.isLoggedIn = false;
    this.authService.Logout();
  }

  getCurrretUser() {
    this.userService.getCurrentUsername().subscribe(data =>{
      this.username = data;
      console.log(data);
    });
  }


  checkAccessToken() {
    this.route.queryParams.subscribe(params =>{
      this.access_token = params['access_token'];
      if(this.access_token != undefined) {
        console.log("access token Recived - " + this.access_token);
        this.isLoggedIn = true;
        this.authService.doLogin(this.access_token);
        this.getCurrretUser();
      }else{
        this.CodeChefloginUrl = environment.codeChefLoginUrl;
      }
    });
  }

}
