import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  activarMenu = false;

  toggleMenu() {
    this.activarMenu = !this.activarMenu
  }
  iraSection(section_id: string) {
    // this.activarMenu = false;
    const section = document.getElementById(section_id);
    this.activarMenu = !this.activarMenu
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
