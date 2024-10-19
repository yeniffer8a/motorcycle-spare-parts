import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../../types/product.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
})
export class CartProductComponent {
  private cartService = inject(CartService);
  @Input() product: any;

  productQuantity = new FormControl(0);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.productQuantity.setValue(this.product.quantity);
    }
  }
}
