import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  activarMenu = signal(false);
  private cartService = inject(CartService);
  productsInCart = this.cartService.products;

  handlerCartVisibility() {
    this.cartService.toggleCartVisibility();
  }
  toggleMenu() {
    this.activarMenu.set(!this.activarMenu());
  }
  iraSection(section_id: string) {
    const section = document.getElementById(section_id);
    this.activarMenu.set(!this.activarMenu());
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
