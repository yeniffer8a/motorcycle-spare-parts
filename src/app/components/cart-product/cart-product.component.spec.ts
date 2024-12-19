import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartProductComponent } from './cart-product.component';
import { CartService } from '../../services/cart-service/cart.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('CartProductComponent', () => {
  let component: CartProductComponent;
  let fixture: ComponentFixture<CartProductComponent>;
  let cartServiceStub: Partial<CartService>;

  beforeEach(async () => {
    cartServiceStub = {
      decrementProductInCart: jasmine.createSpy('decrementProductInCart'),
      incrementProductInCart: jasmine.createSpy('incrementProductInCart'),
      deleteAllProductIncart: jasmine.createSpy('deleteAllProductIncart')
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CartProductComponent],
      providers: [
        { provide: CartService, useValue: cartServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartProductComponent);
    component = fixture.componentInstance;
    component.product = {
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
    };
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // it('debería establecer la cantidad del producto cuando cambia el producto', () => {
  //   const changes: SimpleChanges = {
  //     product: new SimpleChange(
  //       {
  //         _id: '1',
  //         cod: '123',
  //         name: 'Test Product',
  //         description: 'Test description',
  //         price: 100,
  //         brand: 'Test Brand',
  //         model: 'Test Model',
  //         category: 'Test Category',
  //         dimensions: '10x10',
  //         stock: 5,
  //         image: 'test-image.jpg',
  //         quantity: 2
  //       },
  //       {
  //         _id: '1',
  //         cod: '123',
  //         name: 'Test Product',
  //         description: 'Test description',
  //         price: 100,
  //         brand: 'Test Brand',
  //         model: 'Test Model',
  //         category: 'Test Category',
  //         dimensions: '10x10',
  //         stock: 5,
  //         image: 'test-image.jpg',
  //         quantity: 5
  //       },
  //       false
  //     )
  //   };
  //   component.ngOnChanges(changes);
  //   fixture.detectChanges();
  //   expect(component.productQuantity.value).toBe(5);
  // });

  it('debería decrementar la cantidad del producto en el carrito', () => {
    component.decrementProductInCart('1');
    expect(cartServiceStub.decrementProductInCart).toHaveBeenCalledWith('1');
  });

  it('debería incrementar la cantidad del producto en el carrito', () => {
    component.incrementProductInCart('1');
    expect(cartServiceStub.incrementProductInCart).toHaveBeenCalledWith('1');
  });

  it('debería eliminar todos los productos del carrito', () => {
    component.deleteAllProductInCart('1');
    expect(cartServiceStub.deleteAllProductIncart).toHaveBeenCalledWith('1');
  });
});
