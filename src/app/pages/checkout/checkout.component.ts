import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service/cart.service';
import { CartProductComponent } from '../../components/cart-product/cart-product.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CartProductComponent, HeaderComponent, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartService = inject(CartService);
  private router = inject(Router);
  products = this.cartService.products;
  message = signal('');
  paymentDetails = new FormGroup({
    shippingAdress: new FormControl(''),
    paymentMethod: new FormControl(''),
  });

  ngOnInit() {
    //this.cartService.toggleCartVisibility();
    const closeCart = this.cartService.cartVisibility;
    // console.log(closeCart());
    if (closeCart()) {
      closeCart.set(false);
    }
  }
  // cleanCart() {
  //   this.cartService.deleteAllProductInCart();
  //   this.router.navigate(['/checkout']);
  // }
  onSubmit() {
    if (this.products().size >= 1 && this.paymentDetails.valid) {
      this.cartService.createOrder(this.paymentDetails.value).subscribe({
        next: () => this.router.navigate(['/checkout']),
      });

      //console.log(this.paymentDetails);
    }

    this.message.set('Order creada con éxito');
    this.cartService.deleteAllProductInCart();
  }
}
