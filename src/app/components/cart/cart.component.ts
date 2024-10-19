import { Component, inject } from '@angular/core';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductComponent, CommonModule, RouterLinkWithHref],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartService = inject(CartService);
  cartVisibility = this.cartService.cartVisibility;

  handlerCartVisibility(): void {
    this.cartService.toggleCartVisibility();
  }
}
