import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../../../../types/order.model';
import { Product } from '../../../../types/product.model';

@Component({
  selector: 'app-user-purchase-history',
  standalone: true,
  imports: [],
  templateUrl: './user-purchase-history.component.html',
  styleUrl: './user-purchase-history.component.css',
})
export class UserPurchaseHistoryComponent {
  userService = inject(UserService);
  private http = inject(HttpClient);
  user = this.userService.user;
  orders = signal<Order[]>([]);
  products = signal<Order[]>([]);

  listOrders() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get('http://localhost:3000/api/orders', { headers });
  }

  ngOnInit() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    this.http.get('http://localhost:3000/api/orders', { headers }).subscribe({
      next: (response: any) => {
        this.orders.set(response);
        // console.log(this.products());
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
