import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartService = inject(CartService);

  ngOnInit() {
    //this.cartService.toggleCartVisibility();
    const closeCart = this.cartService.cartVisibility;
    console.log(closeCart());
    if (closeCart()) {
      closeCart.set(false);
    }
  }
}
