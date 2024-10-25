import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User } from '../../../types/User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  user = signal<null | User>(null);
  constructor() {}

  getOneUser() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get('http://localhost:3000/api/users', { headers });
  }

  login(datosDelUsuario: { email: string; password: string }) {
    return this.http.post('http://localhost:3000/api/token', {
      email: datosDelUsuario.email,
      password: datosDelUsuario.password,
    });
  }

  register(formData: FormData) {
    return this.http.post('http://localhost:3000/api/users', formData);
  }
  // upDateUser(upDateUserId:string){
  //   return this.http.patch('http://localhost:3000/api/users/' +upDateUserId, );
  // }
  upDateUserForm(formData: any) {
    //console.log(localStorage.getItem('token'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    //console.log(headers.get('Authorization'));
    return this.http.patch('http://localhost:3000/api/users', formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }
}
