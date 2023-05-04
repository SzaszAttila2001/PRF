import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  // Users
  
  getUsers(){
    return this.http.get(environment.severUrl + '/api/users');
  }

  getUserByID(id: string){
    return this.http.get(environment.severUrl + '/api/users/' + id);
  }

  updateUser(user: any){
    return this.http.patch(environment.severUrl + '/api/users/' + user._id, user);
  }

  deleteUserByID(id: string){
    return this.http.delete(environment.severUrl + '/api/users/' + id);
  }

  // Items

  getItems(){
    return this.http.get(environment.severUrl + '/api/items');
  }

  getItemByID(id: string){
   return this.http.get(environment.severUrl + '/api/items/select/' + id); 
  }

  updateItem(item: any){
    return this.http.patch(environment.severUrl + '/api/items/' + item._id, item);
  }

  deleteItemByID(id: string){
    return this.http.delete(environment.severUrl + '/api/items/' + id);
  }

  saveItem(item:any){
    return this.http.post(environment.severUrl + '/api/items', item);
  }
}
