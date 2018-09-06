import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})


export class AuthComponent implements OnInit {

  codeChefUrl = 'https://api.codechef.com/oauth/authorize?response_type=code&client_id=21a85d79b82b47b5f2b4041de91efd2f&state=xyz&redirect_uri=http://localhost:3000/oauth/codechef';
  abc = '';

  constructor(
    private http: HttpClient
  ) {}


  ngOnInit() {
  }

  onClickMe() {
    window.open(this.codeChefUrl, '_blank');
  }
}
