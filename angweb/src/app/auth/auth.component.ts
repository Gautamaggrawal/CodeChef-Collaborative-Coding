import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  })
};

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})


export class AuthComponent implements OnInit {

  codeChefUrl = 'https://api.codechef.com/oauth/authorize?response_type=code&client_id=21a85d79b82b47b5f2b4041de91efd2f&state=xyz&redirect_uri=http://localhost:4200/auth';
  abc = '';

  constructor(
    private http: HttpClient
  ) {}


  ngOnInit() {
  }

  onClickMe() {
    this.http.get(this.codeChefUrl,httpOptions).subscribe(res=>{
      console.log(res);
    }),error=>{
      console.error(error);
    } 

  }
}
