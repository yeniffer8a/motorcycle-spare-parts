import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

import { OrderService } from '../../services/order.service';
import { Order } from '../../../../types/order.model';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../types/product.model';

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
  products = signal<Product[]>([]);
  orderService = inject(OrderService);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  itemName = signal('');
  description = signal('');
  quantity = signal('');
  unitPrice = signal('');

  ngOnInit() {
    this.orderService.getAll().subscribe({
      next: (response: any) => {
        console.log('response 1--->', response.orders);
        if (Array.isArray(response.orders)) {
          this.orders.set(response.orders);
          //this.products.set(response.orders[0].products[0].product);
          //   this.products.set(
          //  )
          for (let i = 0; i < this.orders().length; i++) {
            let products = response.orders[i].products;
            console.log('---------', products);
            this.products.set(products);
            console.log('traditional for products---->', this.products(), i);

            for (let j = 0; j < this.products().length; j++) {
              //let products = orders[i].products[j];
              this.itemName.set(products[j].product.name);
              this.description.set(products[j].product.description);
              this.quantity.set(products[j].quantity);
              this.unitPrice.set(products[j].product.price);

              console.log(
                'traditional for products.quantity---->',
                this.quantity(),
                this.unitPrice()
              );
            }
          }
          console.log('Despues del for ', this.products());
          // this.orders().forEach((order) => {
          //   this.products.set(order.products);
          //   console.log('forEach products--->', this.products());
          // });

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
  getProducts() {}
}
