import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../../../types/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  products = signal<Product[]>([]);

  constructor() {}

  getOneProducts() {
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${localStorage.getItem('token')}`,
    // });
    return this.http.get('http://localhost:3000/api/products');
  }

  getProductById(id: string) {
    return this.http.get('http://localhost:3000/api/products/' + id);
  }
  list() {
    return this.http.get('http://localhost:3000/api/products');
  }
}
