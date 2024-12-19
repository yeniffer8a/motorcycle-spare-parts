import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products-service/products.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../../types/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  //currentIndex = signal(0); // Index of the current image of the products.
  currentIndex: number = 1;
  productsService = inject(ProductsService);
  http = inject(HttpClient);
  products = this.productsService.products;
  product = signal<Product[]>([]);
  error = signal('');
  interval: any;
  ngOnInit() {
    this.getProductList();
    this.startAutoSlide();
    // this.product.set(this.products()?.find((e)=>{e.stock>}))
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.interval);
  }
  getProductList() {
    this.productsService.list().subscribe({
      next: (response: any) => {
        this.products.set(response);
      },
      error: (error) => {
        console.error(error);
        this.error.set(error.error);
      },
    });
  }

  //Method to move to the next product image
  nextImage(): void {
    if (this.currentIndex < this.products().length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }
  //Method
  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.products().length - 1;
    }
  }

  // Seleccionar una imagen específica
  selectImage(index: number): void {
    this.currentIndex = index;
  }
  startAutoSlide(): void {
    this.interval = setInterval(() => {
      this.nextImage();
    }, 3100);
    // Cambiar cada 3.1 segundos
  }
}
