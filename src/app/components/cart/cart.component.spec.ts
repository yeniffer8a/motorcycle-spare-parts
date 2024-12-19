import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart-service/cart.service';
import { RouterLinkWithHref } from '@angular/router';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { CommonModule } from '@angular/common';
import { WritableSignal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceStub: Partial<CartService>;

  beforeEach(async () => {
    cartServiceStub = {
      total: signal(100) as unknown as WritableSignal<number>,
      cartVisibility: signal(true) as unknown as WritableSignal<boolean>,
      products: signal(new Map([['1', {
        _id: '1',
        cod: '123',
        name: 'Test Product',
        description: 'Test description',
        price: 100,
        brand: 'Test Brand',
        model: 'Test Model',
        category: 'Test Category',
        dimensions: '10x10',
        stock: 5,
        image: 'test-image.jpg',
        quantity: 2
      }]])) as unknown as WritableSignal<Map<any, any>>,
      toggleCartVisibility: jasmine.createSpy('toggleCartVisibility')
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterLinkWithHref, RouterTestingModule, CartComponent, CartProductComponent],
      providers: [
        { provide: CartService, useValue: cartServiceStub },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar correctamente las propiedades del carrito', () => {
    expect(component.cart()).toEqual(cartServiceStub.products!());
    expect(component.cartVisibility()).toBe(cartServiceStub.cartVisibility!());
    expect(component.totalPriceCart()).toBe(cartServiceStub.total!());
  });

  it('debería llamar a toggleCartVisibility del servicio cuando se invoca handlerCartVisibility', () => {
    component.handlerCartVisibility();
    expect(cartServiceStub.toggleCartVisibility).toHaveBeenCalled();
  });
});
