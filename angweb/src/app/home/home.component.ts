import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/service/user.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  access_token : string;
  username: string;

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(data =>{
      var res = JSON.parse(JSON.stringify(data));
      this.username = res.result.data.content.username;
      console.log(data);
    });
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
