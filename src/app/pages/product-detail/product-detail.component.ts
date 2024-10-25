import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../../types/Product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  products = signal<null | Product[]>(null);
  cartService = inject(CartService);

  @Input() Product: any;

  product = signal<null | Product>(null);

  id: any;

  private productsService = inject(ProductsService);

  private route = inject(ActivatedRoute);

  productQuantity = new FormControl(0);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.Product) {
      this.productQuantity.setValue(this.Product.quantity);
    }
  }

  ngOnInit(): void {
    // Obtener el ID del parámetro de la ruta
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id'); // Extraer el ID
      console.log('ID extraído:', this.id);
    });
    this.getproducts();
    this.getProductById();
  }

  getProductById() {
    this.productsService.getProductById(this.id).subscribe({
      next: (product) => {
        console.log(product);
        this.product.set(product as Product);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getproducts() {
    this.productsService.getOneProducts().subscribe((res: any) => {
      console.log(res);
      const products = [];
      for (let i = 0; i < 2; i++) {
        products.push(res[i]);
      }
      console.log(products);
      this.products.set(products);
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  decrementProductInCart(productId: string) {
    this.cartService.decrementProductInCart(productId);
  }

  incrementProductInCart(productId: string) {
    this.cartService.incrementProductInCart(productId);
  }
}
