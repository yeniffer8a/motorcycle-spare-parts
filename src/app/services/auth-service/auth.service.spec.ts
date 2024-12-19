import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería establecer el token en localStorage', () => {
    const token = 'fake-jwt-token';
    spyOn(localStorage, 'setItem');

    service.setToken(token);

    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
  });

  it('debería remover el token de localStorage', () => {
    spyOn(localStorage, 'removeItem');

    service.removeToken();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
