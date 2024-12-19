import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../../services/user-service/user.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceStub: Partial<UserService>;
  let routerStub: Partial<Router>;

  beforeEach(async () => {
    userServiceStub = {
      login: jasmine.createSpy('login').and.callFake((user: { email: string; password: string }) => {
        if (user.email === 'test@example.com' && user.password === 'password') {
          return of({ token: 'fake-jwt-token' });
        } else {
          return throwError({ error: 'Invalid credentials' });
        }
      })
    };

    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, LoginComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: {} },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar un error si las credenciales son inválidas', () => {
    component.login.setValue({ email: 'wrong@example.com', password: 'wrongpassword' });
    component.onSubmit();
    expect(userServiceStub.login).toHaveBeenCalled();
    expect(component.error()).toBe('Invalid credentials');
  });

  it('debería navegar a la página principal si las credenciales son válidas', () => {
    component.login.setValue({ email: 'test@example.com', password: 'password' });
    component.onSubmit();
    expect(userServiceStub.login).toHaveBeenCalled();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/']);
  });
});
