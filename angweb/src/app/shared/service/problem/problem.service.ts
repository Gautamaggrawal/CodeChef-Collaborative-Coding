import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private http:HttpClient) { }

  getProblem(problemCode): Observable<any> {
    return this.http.get<any>(environment.codeChefBaseUrl+'/contests/PRACTICE/problems/'+problemCode);
  }
}
