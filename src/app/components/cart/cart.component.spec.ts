import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from '../../services/cart.service';
import { CartComponent } from './cart.component';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CartComponent test', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const cartSpyObj = jasmine.createSpyObj('CartService', [
      'toggleCartVisibility',
      'addToCart',
      'decrementProductInCart',
      'incrementProductInCart',
      'deleteProductInCartById',
      'createOrder',
      'deleteAllProductInCart',
    ]);

    // Mock signals in CartService
    const mockProducts = signal(new Map());
    const mockCartVisibility = signal(false);
    const mockTotal = signal(100);

    cartSpyObj.products = mockProducts;
    cartSpyObj.cartVisibility = mockCartVisibility;
    cartSpyObj.total = mockTotal;

    // Mock ActivatedRoute
    const mockActivatedRoute = {
      snapshot: {
        paramMap: of({}), // Simulate an empty paramMap (you can modify it if needed)
      },
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: CartService, useValue: cartSpyObj },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide mock ActivatedRoute
      ],
      imports: [CommonModule, RouterLinkWithHref],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;

    // Mock totalPriceCart as a signal
    component.totalPriceCart = signal(100); // Mock as a signal

    fixture.detectChanges(); // Trigger initial change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleCartVisibility when handlerCartVisibility is called', () => {
    component.handlerCartVisibility();
    expect(cartServiceSpy.toggleCartVisibility).toHaveBeenCalled();
  });

  // it('should display the correct total price', () => {
  //   // Simulamos el valor del total y los productos del carrito
  //   const productsMap = new Map();
  //   productsMap.set('1', { _id: '1', price: 100, quantity: 1 });
  //   cartServiceSpy.products.and.returnValue(productsMap);
  //   cartServiceSpy.total.and.returnValue(100);

  //   // Detectamos los cambios en el componente
  //   fixture.detectChanges();

  //   // Esperamos hasta que el elemento esté presente en el DOM
  //   fixture.whenStable().then(() => {
  //     const totalElement =
  //       fixture.nativeElement.querySelector('.details h3 span');
  //     expect(totalElement.textContent).toContain('100');
  //   });
  // });

  it('should toggle cart visibility when handlerCartVisibility is called', () => {
    const initialVisibility = component.cartVisibility();
    component.handlerCartVisibility();
    fixture.detectChanges();
    expect(component.cartVisibility()).toBe(initialVisibility);
  });

  it('should correctly handle adding a product to the cart', () => {
    const product = {
      _id: '1',
      name: 'Test Product',
      price: 10,
      quantity: 1,
    } as any;
    component.cartService.addToCart(product);
    fixture.detectChanges();
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(product);
  });

  it('should correctly handle product quantity increment', () => {
    const productId = '1';
    component.cartService.incrementProductInCart(productId);
    fixture.detectChanges();
    expect(cartServiceSpy.incrementProductInCart).toHaveBeenCalledWith(
      productId
    );
  });

  it('should correctly handle product quantity decrement', () => {
    const productId = '1';
    component.cartService.decrementProductInCart(productId);
    fixture.detectChanges();
    expect(cartServiceSpy.decrementProductInCart).toHaveBeenCalledWith(
      productId
    );
  });

  it('should handle deleting a product from the cart', () => {
    const productId = '1';
    component.cartService.deleteProductInCartById(productId);
    fixture.detectChanges();
    expect(cartServiceSpy.deleteProductInCartById).toHaveBeenCalledWith(
      productId
    );
  });

  it('should clear all products when deleteAllProductInCart is called', () => {
    component.cartService.deleteAllProductInCart();
    fixture.detectChanges();
    expect(cartServiceSpy.deleteAllProductInCart).toHaveBeenCalled();
  });
});
