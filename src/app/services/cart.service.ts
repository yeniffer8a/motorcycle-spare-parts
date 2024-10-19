import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../../types/product.model';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  products = signal(new Map());
  cartVisibility = signal(false);

  total = computed(() => {
    const productsMap = this.products();
    let total = 0;

    productsMap.forEach((product) => {
      total += product.price * product.quantity;
    });

    return total;
  });

  toggleCartVisibility() {
    this.cartVisibility.update((value) => !value);
  }
  addToCart(product: Product) {
    console.log('signal---->', this.products(), 'ProductInCart--->', product);

    this.products.update((productsMap) => {
      console.log('Product--1-->', productsMap);
      const productInCart = productsMap.get(product._id);
      console.log('Product--2-->', productInCart);
      if (productInCart) {
        productsMap.set(product._id, {
          ...productInCart,
          quantity: productInCart.quantity + 1,
        });
      } else {
        productsMap.set(product._id, { ...product, quantity: 1 });
        console.log(productsMap);
      }

      return new Map(productsMap);
    });
  }
}
