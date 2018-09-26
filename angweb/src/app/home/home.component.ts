import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { UserService } from '../shared/service/user.service';
import { AuthService } from '../shared/service/auth/auth.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;                       //username of the current user
  access_token: string;                   //access_token 
  CodeChefloginUrl: string;               //CodeChef login url
  isLoggedIn: boolean = false;            //flag is user is logged In
  subscribeLoggedIn;                      //subscribe to login value in auth service to check if user is logged in across routes

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    // subscribe to loggedIn in auth service
    this.subscribeLoggedIn = this.authService.isLoggedInChanged.subscribe((value)=>{
      this.isLoggedIn = value;
    });

     // check if returnUrl then present save to localStorage
    var returnUrl = this.route.snapshot.queryParams['returnUrl'];
    if(returnUrl != undefined)
      localStorage.setItem('returnUrl', returnUrl);
    
    // check if user is authenticated else check for access token reciving from server else setup login url
    if(this.authService.isAuthenticated()){
      //console.log('logged In');
      this.getCurrretUser();
      
      // this enables the logged In user to go to school directly
      if(this.router.url == '/home')
        this.router.navigate(['home/school']);

    } else {
      this.checkAccessToken();
    }
  }

  Logout() {
    this.authService.Logout();
  }

  getCurrretUser() {
    this.userService.getCurrentUsername().subscribe(data =>{
      this.username = data;
      //console.log(data);
    });
  }

  // check for access token reciving from server else setup login url
  checkAccessToken() {
    this.route.queryParams.subscribe(params =>{
      this.access_token = params['access_token'];
      if(this.access_token != undefined) {
        console.log("access token Recived - " + this.access_token);
        this.authService.doLogin(this.access_token);
        this.getCurrretUser();
      }else{
        this.CodeChefloginUrl = environment.codeChefLoginUrl;
      }
    });
  }

  // unsubscribe loggedIn
  ngOnDestroy(){
    this.subscribeLoggedIn.unsubscribe();
  }

}
