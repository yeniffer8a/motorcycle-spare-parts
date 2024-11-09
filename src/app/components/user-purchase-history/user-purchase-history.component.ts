import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

import { OrderService } from '../../services/order.service';
import { Order } from '../../../../types/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-purchase-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-purchase-history.component.html',
  styleUrl: './user-purchase-history.component.css',
})
export class UserPurchaseHistoryComponent {
  userService = inject(UserService);
  private http = inject(HttpClient);
  user = this.userService.user;
  orders = signal<Order[]>([]);
  orderService = inject(OrderService);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.orderService.getAll().subscribe({
      next: (response: any) => {
        console.log('response--->', response);
        if (Array.isArray(response.orders)) {
          this.orders.set(response.orders);
          this.loading.set(false);
          console.log('Orders----->', this.orders());
        } else {
          this.error.set('La respuesta no es un arreglo');
          this.loading.set(false);
          console.error('La respuesta no es un arreglo');
        }
      },
      error: (error) => {
        this.error.set('Error al cargar las órdenes');
        this.loading.set(false);
        console.log(error);
      },
    });
  }
}
