import { Component, inject, OnInit, Input, signal, input } from '@angular/core';
import { PromoSliderComponent } from '../../components/promo-slider/promo-slider.component';
import { CardsComponent } from '../../components/cards/cards.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../../types/Product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PromoSliderComponent, CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products = signal<null | Product[]>(null);
  private productsService = inject(ProductsService);
  card: any = this.productsService.getOneProducts();
  cartService = inject(CartService);

  ngOnInit(): void {
    this.getproducts();
  }
  getproducts() {
    this.productsService.getOneProducts().subscribe((res: any) => {
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
