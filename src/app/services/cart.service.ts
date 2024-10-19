import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  cartVisibility = signal(false);

  toggleCartVisibility() {
    this.cartVisibility.update((value) => !value);
  }
}
