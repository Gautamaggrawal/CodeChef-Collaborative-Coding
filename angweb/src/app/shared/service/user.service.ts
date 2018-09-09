import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getCurrentUser() {
    return this.http.get(environment.codeChefBaseUrl+'/users/me');
  }
}
