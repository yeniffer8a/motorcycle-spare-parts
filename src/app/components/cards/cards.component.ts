import { Component, inject, OnInit, Input, signal, input } from '@angular/core';
import { Router, RouterLinkWithHref, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../../types/Product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLink, CurrencyPipe],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  cartService = inject(CartService);
  // @Input() name = ''
  // @Input() price = 0
  // @Input() image = ''
  // @Input() id = ''

  @Input() product: Product | null = null;

  constructor(private router: Router) {}
  // goToDetail(pageName: string): void{
  //   this.router.navigate(['${/productDetail/}'+ this.id])
  // }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
