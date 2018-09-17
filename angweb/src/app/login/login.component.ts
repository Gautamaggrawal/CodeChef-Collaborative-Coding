import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  access_token: string;
  CodeChefloginUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService ) { }

  ngOnInit() {
    var returnUrl = this.route.snapshot.queryParams['returnUrl'];

    // saving returnUrl to localStorage
    if(returnUrl != undefined)
      localStorage.setItem('returnUrl', returnUrl);

    if(this.authService.isAuthenticated()){
      console.log("already logged In");
      this.router.navigate(['/home']);
    } else{ 
      this.route.queryParams.subscribe(params =>{
        this.access_token = params['access_token'];
        if(this.access_token != undefined) {
          console.log("access token Recived - " + this.access_token);
          this.authService.doLogin(this.access_token);
        }else{
          this.CodeChefloginUrl = environment.codeChefLoginUrl;
        }
      });
    }
  }

}
