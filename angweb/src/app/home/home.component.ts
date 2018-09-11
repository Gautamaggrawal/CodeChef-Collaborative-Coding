import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/service/user.service';
import { AuthService } from '../shared/service/auth/auth.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;

  constructor(
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(data =>{
      var res = JSON.parse(JSON.stringify(data));
      this.username = res.result.data.content.username;
      console.log(data);
    });
  }

  Logout() {
    this.authService.Logout();
  }

}
