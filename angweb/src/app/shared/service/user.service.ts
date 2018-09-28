import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public username = new BehaviorSubject<string>(''); // subject to let access to username across child routes

  constructor(private http:HttpClient) { }

  // returns username feteching from api
  getCurrentUsername() {
    return this.http.get(environment.codeChefBaseUrl+'/users/me').pipe(map(res=>{
      var data = JSON.parse(JSON.stringify(res));
      console.log(data);
      var username = data.result.data.content.username;

      // saved for sharing username to child components
      this.username.next(username);
      
      return username;
    }));
  }

  // returns username to child Components 
  getUsername(){
    return this.username.asObservable();
  }

}
