import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart-service/cart.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
})
export class CartProductComponent implements OnChanges {
  private cartService = inject(CartService);

  @Input() product: any;
  productQuantity = new FormControl(0);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && changes['product'].currentValue) {
      this.productQuantity.setValue(this.product.quantity);
    }
  }

  decrementProductInCart(productId: string) {
    this.cartService.decrementProductInCart(productId);
  }

  incrementProductInCart(productId: string) {
    this.cartService.incrementProductInCart(productId);
  }

  deleteAllProductInCart(productId: string) {
    this.cartService.deleteAllProductIncart(productId);
  }
}
