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
    this.userService.getCurrentUsername().subscribe(data =>{
      this.username = data;
      console.log(data);
    });
  }

  Logout() {
    this.authService.Logout();
  }

}
