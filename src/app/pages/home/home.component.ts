import { Component, inject, OnInit, Input, signal, input } from '@angular/core';
import { PromoSliderComponent } from '../../components/promo-slider/promo-slider.component';
import { CardsComponent } from '../../components/cards/cards.component';
import { product } from '../../../../types/products';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PromoSliderComponent, CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  cards: any = this.productService.list();
  products = signal<null | product[]>(null);
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
