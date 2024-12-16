// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CartService } from '../../services/cart.service';
// import { CartComponent } from './cart.component';

// describe('CartComponent test', () => {
//   let componente: CartComponent;
//   let fixture: ComponentFixture<CartComponent>;
//   let cartServiceSpy: jasmine.SpyObj<CartService>;

//   beforeEach(async () => {
//     const cartSpyObj = jasmine.createSpyObj('CartService', [
//       'toggleCartVisibility',
//     ]);
//     await TestBed.configureTestingModule({
//       providers: [{ provide: CartService, useValue: cartSpyObj }],
//     }).compileComponents();

//     fixture = TestBed.createComponent(CartComponent);
//     componente = fixture.componentInstance;
//     cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;

//     fixture.detectChanges();
//   });

//   it('should be created', () => {
//     expect(componente).toBeTruthy();
//   });
// });
