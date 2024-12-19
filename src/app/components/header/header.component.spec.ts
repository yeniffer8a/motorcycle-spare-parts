import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth-service/auth.service';
import { CartService } from '../../services/cart-service/cart.service';
import { UserService } from '../../services/user-service/user.service';
import { Signal, signal } from '@angular/core';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceStub: Partial<AuthService>;
  let cartServiceStub: Partial<CartService>;
  let userServiceStub: Partial<UserService>;

  beforeEach(async () => {
    authServiceStub = {
      removeToken: jasmine.createSpy('removeToken')
    };

    cartServiceStub = {
      toggleCartVisibility: jasmine.createSpy('toggleCartVisibility'),
      products: signal(new Map<string, any>())
    };

    userServiceStub = {
      user: signal(null)
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HeaderComponent], // Mover HeaderComponent a imports
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: CartService, useValue: cartServiceStub },
        { provide: UserService, useValue: userServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a toggleCartVisibility del CartService cuando se invoca handlerCartVisibility', () => {
    component.handlerCartVisibility();
    expect(cartServiceStub.toggleCartVisibility).toHaveBeenCalled();
  });

  it('debería cambiar el estado de activarMenu cuando se invoca toggleMenu', () => {
    component.activarMenu.set(false);
    component.toggleMenu();
    expect(component.activarMenu()).toBeTrue();
    component.toggleMenu();
    expect(component.activarMenu()).toBeFalse();
  });

  it('debería navegar a la sección correcta cuando se invoca iraSection', () => {
    const sectionId = 'test-section';
    spyOn(document, 'getElementById').and.returnValue({
      scrollIntoView: jasmine.createSpy('scrollIntoView')
    } as any);
    
    component.iraSection(sectionId);
    expect(document.getElementById).toHaveBeenCalledWith(sectionId);
    expect(component.activarMenu()).toBeTrue();
  });

  it('debería cerrar la sesión y navegar a la página de login cuando se invoca logout', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.logout();
    expect(authServiceStub.removeToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
