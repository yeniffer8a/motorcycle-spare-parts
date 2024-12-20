import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceStub: Partial<UserService>;
  let routerStub: Partial<Router>;

  beforeEach(async () => {
    userServiceStub = {
      register: jasmine.createSpy('register').and.callFake((formData: FormData) => {
        const email = formData.get('email');
        if (email === 'test@example.com') {
          return of({});
        } else {
          return throwError({ error: 'Registro fallido' });
        }
      })
    };

    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, RegisterComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar un error si las contraseñas no coinciden', () => {
    component.register.setValue({
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password',
      confirmPassword: 'differentpassword',
      phoneNumber: '1234567890',
      address: 'Test Address',
      image: null
    });
    component.onSubmit();
    expect(component.error()).toBe('Las contraseñas no coinciden');
  });

  it('debería mostrar un error si el formulario no es válido', () => {
    component.register.setValue({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      address: '',
      image: null
    });
    component.onSubmit();
    expect(component.error()).toBe('Llenar todos los campos');
  });

  it('debería navegar a la página de login si el registro es exitoso', (done) => {
    const file = new File([''], 'test-image.jpg');
    
    component.register.setValue({
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password',
      confirmPassword: 'password',
      phoneNumber: '1234567890',
      address: 'Test Address',
      image: null
    });

    const event = { target: { files: [file] } };
    component.onFileChange(event);

    // Pasar directamente el archivo en lugar de usar setValue
    component.image = file;
    
    component.onSubmit();
    
    setTimeout(() => {
      expect(userServiceStub.register).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/login']);
      done();
    }, 0);
  });

  it('debería mostrar un error si el registro falla', (done) => {
    const file = new File([''], 'test-image.jpg');

    component.register.setValue({
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      email: 'wrong@example.com',
      password: 'password',
      confirmPassword: 'password',
      phoneNumber: '1234567890',
      address: 'Test Address',
      image: null
    });

    const event = { target: { files: [file] } };
    component.onFileChange(event);

    // Pasar directamente el archivo en lugar de usar setValue
    component.image = file;
    
    component.onSubmit();

    setTimeout(() => {
      expect(userServiceStub.register).toHaveBeenCalled();
      expect(component.error()).toBe('Registro fallido');
      done();
    }, 0);
  });
});
