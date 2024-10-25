import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../types/product.model';
import { RouterLinkWithHref } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent, RouterLinkWithHref, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);
  products = signal<Product[]>([]);

  ngOnInit() {
    this.productService.list().subscribe({
      next: (response: any) => {
        this.products.set(response);
        // console.log(this.products());
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
