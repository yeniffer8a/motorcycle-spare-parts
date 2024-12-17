import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../../../../types/User';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get one user', () => {
    const mockUser: User = {
      _id: '123',
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      age: 30,
      address: '123 Main St',
      phoneNumber: 1234567890,
      image: 'image.png',
      roleCode: 1,
      __v: 0,
    };

    service.getOneUser().subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should login user', () => {
    const mockToken = 'fake-jwt-token';
    const loginData = { email: 'test@example.com', password: 'password' };

    service.login(loginData).subscribe((token) => {
      expect(token).toEqual(mockToken);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/token');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginData);
    req.flush(mockToken);
  });

  it('should register user', () => {
    const formData = new FormData();
    formData.append('username', 'johndoe');
    formData.append('firstName', 'John');
    formData.append('lastName', 'Doe');
    formData.append('email', 'john.doe@example.com');
    formData.append('password', 'password123');
    formData.append('age', '30');
    formData.append('address', '123 Main St');
    formData.append('phoneNumber', '1234567890');
    formData.append('image', 'image.png');
    formData.append('roleCode', '1');

    service.register(formData).subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:3000/api/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(formData);
    req.flush({ success: true });
  });

  it('should update user', () => {
    const formData = new FormData();
    formData.append('username', 'johndoe');
    formData.append('firstName', 'John');
    formData.append('lastName', 'Doe');
    formData.append('email', 'john.doe@example.com');
    formData.append('password', 'password123');
    formData.append('age', '30');
    formData.append('address', '123 Main St');
    formData.append('phoneNumber', '1234567890');
    formData.append('image', 'image.png');
    formData.append('roleCode', '1');

    service.upDateUserForm(formData).subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:3000/api/users');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toBe(formData);
    req.flush({ success: true });
  });
});
