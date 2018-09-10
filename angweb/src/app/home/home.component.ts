import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/service/user.service';
import { AuthService } from '../shared/service/auth/auth.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  practicePrb1: 'CHN04';
  practicePrb2: 'SPOOL';

  access_token : string;
  username: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(data =>{
      var res = JSON.parse(JSON.stringify(data));
      this.username = res.result.data.content.username;
      console.log(data);
    });
  }

  
  onClickProblem(problemCode) {
    console.log(problemCode);
    this.router.navigate(['/problem/',problemCode]);
  }

  Logout() {
    this.authService.Logout();
  }

}
