import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post(environment.severUrl + '/api/users/login', {username: username, password: password});
  }

  logout(){
    return this.http.post(environment.severUrl + '/api/users/logout', {}, {withCredentials: true, responseType: 'text'});
  }

  register(user: any){
    return this.http.post(environment.severUrl + '/api/users', user);
  }
}
