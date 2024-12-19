import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { Product } from '../../../../types/Product';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería calcular el total correctamente', () => {
    const product1: Product = { _id: '1', cod: 'P001', name: 'Product 1', description: 'Description 1', price: 10, brand: 'Brand 1', model: 'Model 1', category: 'Category 1', dimensions: '10x10', stock: 100, image: 'image1.png' };
    const product2: Product = { _id: '2', cod: 'P002', name: 'Product 2', description: 'Description 2', price: 20, brand: 'Brand 2', model: 'Model 2', category: 'Category 2', dimensions: '20x20', stock: 200, image: 'image2.png' };
    
    service.products.set(new Map([['1', { ...product1, quantity: 2 }], ['2', { ...product2, quantity: 1 }]]));

    expect(service.total()).toBe(40);
  });

  it('debería cambiar la visibilidad del carrito', () => {
    service.toggleCartVisibility();
    expect(service.cartVisibility()).toBeTrue();
    service.toggleCartVisibility();
    expect(service.cartVisibility()).toBeFalse();
  });

  it('debería añadir un producto al carrito', () => {
    const product: Product = { _id: '1', cod: 'P001', name: 'Product 1', description: 'Description 1', price: 10, brand: 'Brand 1', model: 'Model 1', category: 'Category 1', dimensions: '10x10', stock: 100, image: 'image1.png' };
    service.addToCart(product);

    expect(service.products().get(product._id)).toEqual({ ...product, quantity: 1 });
  });

  it('debería incrementar la cantidad del producto en el carrito', () => {
    const product: Product = { _id: '1', cod: 'P001', name: 'Product 1', description: 'Description 1', price: 10, brand: 'Brand 1', model: 'Model 1', category: 'Category 1', dimensions: '10x10', stock: 100, image: 'image1.png' };
    service.addToCart(product);
    service.incrementProductInCart(product._id);

    expect(service.products().get(product._id)!.quantity).toBe(2);
  });

  it('debería decrementar la cantidad del producto en el carrito', () => {
    const product: Product = { _id: '1', cod: 'P001', name: 'Product 1', description: 'Description 1', price: 10, brand: 'Brand 1', model: 'Model 1', category: 'Category 1', dimensions: '10x10', stock: 100, image: 'image1.png' };
    service.addToCart(product);
    service.incrementProductInCart(product._id);
    service.decrementProductInCart(product._id);

    expect(service.products().get(product._id)!.quantity).toBe(1);
  });

  it('debería eliminar el producto del carrito si la cantidad es uno y se llama a decrementar', () => {
    const product: Product = { _id: '1', cod: 'P001', name: 'Product 1', description: 'Description 1', price: 10, brand: 'Brand 1', model: 'Model 1', category: 'Category 1', dimensions: '10x10', stock: 100, image: 'image1.png' };
    service.addToCart(product);
    service.decrementProductInCart(product._id);

    expect(service.products().has(product._id)).toBeFalse();
  });

  it('debería eliminar todos los productos del carrito', () => {
    const product: Product = { _id: '1', cod: 'P001', name: 'Product 1', description: 'Description 1', price: 10, brand: 'Brand 1', model: 'Model 1', category: 'Category 1', dimensions: '10x10', stock: 100, image: 'image1.png' };
    service.addToCart(product);
    service.deleteAllProductIncart(product._id);

    expect(service.products().has(product._id)).toBeFalse();
  });

  it('debería crear una orden', () => {
    const product: Product = { _id: '1', cod: 'P001', name: 'Product 1', description: 'Description 1', price: 10, brand: 'Brand 1', model: 'Model 1', category: 'Category 1', dimensions: '10x10', stock: 100, image: 'image1.png' };
    service.addToCart(product);

    const formData = {
      shippingAdress: '123 Test St',
      paymentMethod: 'Credit Card'
    };

    service.createOrder(formData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/api/orders');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });
});
