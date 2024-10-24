import { computed, inject, Injectable, signal } from '@angular/core';
// import { Product } from '../../../types/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../../types/Product'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  products = signal(new Map());
  cartVisibility = signal(false);
  private http = inject(HttpClient);

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

  decrementProductInCart(productId: string) {
    this.products.update((productsMap) => {
      const productInCart = productsMap.get(productId);
      if (productInCart!.quantity === 1) {
        productsMap.delete(productId);
      } else {
        productsMap.set(productId, {
          ...productInCart!,
          quantity: productInCart!.quantity - 1,
        });
      }

      return new Map(productsMap);
    });
  }
  incrementProductInCart(productId: string) {
    this.products.update((productsMap) => {
      const productInCart = productsMap.get(productId);

      if (productInCart) {
        productsMap.set(productId, {
          ...productInCart,
          quantity: productInCart.quantity + 1,
        });
      }

      return new Map(productsMap);
    });
  }
  deleteAllProductIncart(productId: string) {
    this.products.update((productsMap) => {
      productsMap.delete(productId);
      return new Map(productsMap);
    });
  }
  createOrder(formData: any) {
    const mapToArray = Array.from(this.products().values());
    const productsArray = mapToArray.map((product) => {
      return { productId: product._id, quantity: product.quantity };
    });

    return this.http.post(
      'http://localhost:3000/api/orders',
      {
        products: productsArray,
        total: this.total(),
        dato1: formData.dato1,
        dato2: formData.dato2,
        dato3: formData.dato3,
        paymentMethod: formData.paymentMethod,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
