import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  setToken(token: string) {
    localStorage.setItem('token', token);
    return;
  }

  removeToken() {
    localStorage.removeItem('token');
    return;
  }
}
