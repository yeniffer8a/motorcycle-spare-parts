import { Component, inject, OnInit, Input, signal, input } from '@angular/core';
import { PromoSliderComponent } from '../../components/promo-slider/promo-slider.component';
import { CardsComponent } from '../../components/cards/cards.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../../types/Product';
import { CartService } from '../../services/cart.service';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private productsService = inject(ProductsService);
  products = this.productsService.products;
  card: any = this.productsService.getOneProducts();
  cartService = inject(CartService);
  error = signal('');
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
