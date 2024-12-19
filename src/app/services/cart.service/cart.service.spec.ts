import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { Product } from '../../../../types/product.model';
import { Order } from '../../../../types/order.model';
describe('CartService test', () => {
  let service: CartService;
  let httpMock: HttpTestingController;
  const product = {
    _id: '1',
    cod: 'P1',
    name: 'Test Product',
    description: 'Description',
    price: 100,
    brand: 'Brand',
    model: 'Model',
    category: 'Category',
    dimensions: '10x10',
    stock: 10,
    image: 'Image',
    quantity: 0,
  };
  const product1 = {
    _id: '2',
    cod: 'P2',
    name: 'Test Product 2',
    description: 'Description',
    price: 200,
    brand: 'Brand',
    model: 'Model',
    category: 'Category',
    dimensions: '10x10',
    stock: 20,
    image: 'Image',
    quantity: 0,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService],
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should initialize with an empty cart', () => {
    expect(service.products().size).toBe(0);
  });

  it('should add a product to the cart', () => {
    service.addToCart(product);
    expect(service.products().get(product._id)?.quantity).toBe(1);
  });

  it('should increment product quantity in the cart', () => {
    service.addToCart(product);
    service.incrementProductInCart(product._id);
    expect(service.products().get(product._id)?.quantity).toBe(2);
  });

  it('should decrement product quantity in the cart', () => {
    service.addToCart(product);
    service.incrementProductInCart(product._id);
    service.decrementProductInCart(product._id);
    expect(service.products().get(product._id)?.quantity).toBe(1);
  });

  it('should remove product from the cart when quantity is zero', () => {
    service.addToCart(product);
    service.decrementProductInCart(product._id);
    expect(service.products().size).toBe(0);
  });

  it('should delete a product from the cart by ID', () => {
    service.addToCart(product);
    service.deleteProductInCartById(product._id);
    expect(service.products().has(product._id)).toBe(false);
  });

  it('should toggle cart visibility', () => {
    service.toggleCartVisibility();
    expect(service.cartVisibility()).toBe(true);
    service.toggleCartVisibility();
    expect(service.cartVisibility()).toBe(false);
  });

  it('should calculate the total price correctly', () => {
    service.addToCart(product);
    service.addToCart(product1);
    service.incrementProductInCart(product1._id);
    expect(service.total()).toBe(500); // 1*100 + 2*200 });
  });

  it('should create an order correctly', () => {
    const formData = {
      shippingAdress: '123 Test St',
      paymentMethod: 'Credit Card',
    };

    service.addToCart(product);
    service.createOrder(formData).subscribe();
    const req = httpMock.expectOne('http://localhost:3000/api/orders');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      products: [{ productId: '1', quantity: 1 }],
      total: 100,
      shippingAdress: '123 Test St',
      paymentMethod: 'Credit Card',
    });
    req.flush({});
  });
  it('should delete all products in the cart', () => {
    service.addToCart(product);
    service.deleteAllProductInCart();
    expect(service.products().size).toBe(0);
  });
});
