import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../../../types/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  constructor() {}

  getAll() {
    const token = localStorage.getItem('token');
    //console.log('token--->', token);
    if (!token || token.trim() === '') {
      console.error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Order[]>('http://localhost:3000/api/orders', {
      headers,
    });
  }
}
