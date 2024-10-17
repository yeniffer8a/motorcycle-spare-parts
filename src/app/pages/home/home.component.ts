import { Component } from '@angular/core';
import { PromoSliderComponent } from '../../components/promo-slider/promo-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PromoSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
