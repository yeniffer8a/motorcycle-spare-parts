import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../../../../types/product.model';
import { ProductsService } from './products.service';

describe('productService', () => {
  let product: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    product = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(product).toBeTruthy();
  });

  it('should get one product', () => {
    const mockProduct: Product = {
      _id: '1',
      cod: 'P001',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      brand: 'Brand 1',
      model: 'Model 1',
      category: 'Category 1',
      dimensions: '10x10x10',
      stock: 50,
      image: 'image1.png',
    };
    product.getOneProducts().subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });
    const req = httpMock.expectOne('http://localhost:3000/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('sould get product by id', () => {
    const mockProduct: Product = {
      _id: '1',
      cod: 'P001',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      brand: 'Brand 1',
      model: 'Model 1',
      category: 'Category 1',
      dimensions: '10x10x10',
      stock: 50,
      image: 'image1.png',
    };
    product.getProductById('1').subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });
    const req = httpMock.expectOne('http://localhost:3000/api/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should list products', () => {
    const mockProducts: Product[] = [
      {
        _id: '1',
        cod: 'P001',
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
        brand: 'Brand 1',
        model: 'Model 1',
        category: 'Category 1',
        dimensions: '10x10x10',
        stock: 50,
        image: 'image1.png',
      },
      {
        _id: '2',
        cod: 'P002',
        name: 'Product 2',
        description: 'Description 2',
        price: 200,
        brand: 'Brand 2',
        model: 'Model 2',
        category: 'Category 2',
        dimensions: '20x20x20',
        stock: 60,
        image: 'image2.png',
      },
    ];
    product.list().subscribe((product) => {
      expect(product).toEqual(mockProducts);
    });
    const req = httpMock.expectOne('http://localhost:3000/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
});
