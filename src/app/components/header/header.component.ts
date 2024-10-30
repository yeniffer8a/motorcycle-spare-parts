import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  activarMenu = signal(false);
  private cartService = inject(CartService);
  productsInCart = this.cartService.products;
  private userService = inject(UserService);
  user = this.userService.user;

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
  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
  isLogged() {
    return this.userService.isLogged();
  }
}
