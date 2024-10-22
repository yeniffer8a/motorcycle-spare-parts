import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  constructor() { }

  getOneProducts(){
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${localStorage.getItem('token')}`,
    // });
    return this.http.get('http://localhost:3000/api/products');
  }
}

