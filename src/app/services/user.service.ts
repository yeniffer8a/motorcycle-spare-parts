import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User } from '../../../types/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
private http = inject(HttpClient);
user = signal<null|User>(null);
  constructor() { }


  getOneUser(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get('http://localhost:3000/api/users',{headers});
  }

  // upDateUser(upDateUserId:string){
  //   return this.http.patch('http://localhost:3000/api/users/' +upDateUserId, );
  // }
}
