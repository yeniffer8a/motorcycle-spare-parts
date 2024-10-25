import { Component, inject, OnInit, Input, signal, input } from '@angular/core';
import { PromoSliderComponent } from '../../components/promo-slider/promo-slider.component';
import { CardsComponent } from '../../components/cards/cards.component';
import { ProductService } from '../../services/product.service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../../types/Product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PromoSliderComponent, CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  products = signal<null | Product[]>(null);
  private productsService = inject(ProductsService);
  card: any = this.productsService.getOneProducts();

  ngOnInit(): void {
    this.getproducts();
  }
  getproducts() {
    this.productService.list().subscribe((res: any) => {
      console.log(res);
      const products = [];
      for (let i = 0; i < 4; i++) {
        products.push(res[i]);
      }
      console.log(products);
      this.products.set(products);
    });
  }
}
