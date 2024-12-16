// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CartProductComponent } from './cart-product.component';
// import { CartProduct } from '../../../../types/cart-product.model';
// import { Product } from '../../../../types/product.model';
// import { CartService } from '../../services/cart.service';
// import { CurrencyPipe } from '@angular/common';

// describe('CartProductComponent test', () => {
//   let componente: CartProductComponent;
//   let fixture: ComponentFixture<CartProductComponent>;
//   let cartServiceSpy: jasmine.SpyObj<CartService>;

//   const product: Product = {
//     _id: '1',
//     cod: '001',
//     name: 'Test Product',
//     description: 'A test product',
//     price: 100,
//     brand: 'BrandA',
//     model: 'ModelA',
//     category: 'CategoryA',
//     dimensions: '10x10x10',
//     stock: 50,
//     image: 'test-image.jpg',
//   };

//   beforeEach(async () => {
//     const cartSpyObj = jasmine.createSpyObj('CartService', [
//       'decrementProductInCart',
//       'incrementProductInCart',
//       'deleteProductInCartById',
//     ]);

//     await TestBed.configureTestingModule({
//       providers: [{ provide: CartService, useValue: cartSpyObj }, CurrencyPipe],
//     }).compileComponents();

//     fixture = TestBed.createComponent(CartProductComponent);
//     componente = fixture.componentInstance;
//     cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;

//     componente.product = product;
//     fixture.detectChanges();
//   });

//   it('should be created', () => {
//     expect(componente).toBeTruthy();
//   });
//   it('should call cartService.incrementProductInCart when incrementProductInCart is called', () => {
//     const incrementSpy = cartServiceSpy.incrementProductInCart.and.stub();
//     componente.incrementProductInCart(product._id);
//     expect(incrementSpy).toHaveBeenCalledWith(product._id);
//   });
//   it('should call cartService.decrementProductInCart when decrementProductInCart is called', () => {
//     const decrementSpy = cartServiceSpy.decrementProductInCart.and.stub();
//     componente.decrementProductInCart(product._id);
//     expect(decrementSpy).toHaveBeenCalledWith(product._id);
//   });
//   it('should call cartService.deleteProductInCartById when deleteProductInCartById is called', () => {
//     const deleteSpy = cartServiceSpy.deleteProductInCartById.and.stub();
//     componente.deleteProductInCartById(product._id);
//     expect(deleteSpy).toHaveBeenCalledWith(product._id);
//   });
//   it('should initialize productQuantity with correct value on product input', () => {
//     const updatedProduct = { ...product, quantity: 5 };
//     componente.product = updatedProduct;
//     fixture.detectChanges();
//     expect(componente.productQuantity.value).toBe(0);
//   });

//   it('should call the cart service methods with correct parameters', () => {
//     const decrementSpy = cartServiceSpy.decrementProductInCart;
//     const incrementSpy = cartServiceSpy.incrementProductInCart;
//     const deleteSpy = cartServiceSpy.deleteProductInCartById;

//     // Test decrement
//     componente.decrementProductInCart(product._id);
//     expect(decrementSpy).toHaveBeenCalledWith(product._id);

//     // Test increment
//     componente.incrementProductInCart(product._id);
//     expect(incrementSpy).toHaveBeenCalledWith(product._id);

//     // Test delete
//     componente.deleteProductInCartById(product._id);
//     expect(deleteSpy).toHaveBeenCalledWith(product._id);
//   });

//   //   it('should update product quantity when product changes', () => {
//   //     componente.productQuantity.setValue(2); // Cantidad inicial
//   //     const newProduct = { ...product, quantity: 3 }; // Nuevo valor

//   //     // Creamos un objeto que simule el comportamiento de SimpleChange
//   //     const simpleChange: any = {
//   //       previousValue: product,
//   //       currentValue: newProduct,
//   //       firstChange: false,
//   //       isFirstChange: () => false, // Método requerido por SimpleChange
//   //     };

//   //     // Pasamos el objeto simulado al método ngOnChanges
//   //     componente.ngOnChanges({
//   //       product: simpleChange,
//   //     });
//   //     fixture.detectChanges();

//   //     // Verificamos que el valor de productQuantity se haya actualizado correctamente
//   //     expect(componente.productQuantity.value).toBe(3);
//   //   });
// });
