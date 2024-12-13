// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { UserService } from '../../services/user.service';
// import { HttpTestingController } from '@angular/common/http/testing';
// import { of, throwError } from 'rxjs';
// import { Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
// import { User } from '../../../../types/User';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let userServiceSpy: jasmine.SpyObj<UserService>;
//   let routerSpy: jasmine.SpyObj<Router>;
//   let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>; // Declarar ActivatedRoute mock

//   const userEmail = 'test@test.com';
//   const userPassword = '#Clave1234';
//   const mockFakeToken = { token: 'fake-token' };

//   beforeEach(async () => {
//     const userSpyObj = jasmine.createSpyObj('UserService', [
//       'login',
//       'isLogged',
//     ]);
//     const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
//     const activatedRouteSpyObj = jasmine.createSpyObj('ActivatedRoute', [], {
//       snapshot: { paramMap: {} },
//     }); // Mock para ActivatedRoute

//     await TestBed.configureTestingModule({
//       providers: [
//         { provide: UserService, useValue: userSpyObj },
//         { provide: Router, useValue: routerSpyObj },
//         { provide: ActivatedRoute, useValue: activatedRouteSpyObj }, // Añadir el mock de ActivatedRoute
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
//     routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//     activatedRouteSpy = TestBed.inject(
//       ActivatedRoute
//     ) as jasmine.SpyObj<ActivatedRoute>; // Obtener el mock de ActivatedRoute
//     fixture.detectChanges();
//   });

//   it('Should create a component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have an invalid form when no values are entered', () => {
//     const loginForm = component.login;
//     expect(loginForm.valid).toBeFalsy();
//   });

//   it('should have a valid form when both email and password are provided', () => {
//     const loginForm = component.login;
//     loginForm.controls['email'].setValue(userEmail);
//     loginForm.controls['password'].setValue(userPassword);
//     expect(loginForm.valid).toBeTruthy();
//   });

//   it('should call login method and navigate when form is valid', () => {
//     //Arrange
//     const loginForm = component.login;
//     loginForm.controls['email'].setValue(userEmail);
//     loginForm.controls['password'].setValue(userPassword);

//     const loginSpy = userServiceSpy.login.and.returnValue(of(mockFakeToken));

//     // Act - Llamamos al método onSubmit
//     component.onSubmit();

//     //Assert - Verificamos que se haya llamado a login() con los datos correctos
//     expect(loginSpy).toHaveBeenCalledWith({
//       email: userEmail,
//       password: userPassword,
//     });

//     // Verificamos que Router.navigate haya sido llamado para redirigir a la ruta '/'
//     expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);

//     // Verificamos que el token se haya guardado en el localStorage
//     expect(localStorage.getItem('token')).toBe(mockFakeToken.token);
//   });

//   it('should display an error message when login fails', () => {
//     const loginForm = component.login;
//     loginForm.controls['email'].setValue(userEmail);
//     loginForm.controls['password'].setValue(userPassword);

//     const loginSpy = userServiceSpy.login.and.returnValue(
//       throwError({ error: 'Invalid credentials' })
//     );

//     component.onSubmit();

//     expect(loginSpy).toHaveBeenCalled();
//     expect(component.error()).toBe('Invalid credentials');
//   });

//   it('should call isLogged method to check if the user is logged in', () => {
//     // Simular que localStorage contiene un token
//     spyOn(localStorage, 'getItem').and.returnValue(mockFakeToken.token); // Simular la existencia de un token en localStorage

//     // Espiar el método isLogged del servicio
//     const isLoggedSpy = userServiceSpy.isLogged.and.returnValue(true); // Permite que el método real se ejecute

//     // Llamar al método isLogged del servicio (si se espera que sea en el servicio)
//     component.isLogged(); // Llamar directamente al método isLogged del servicio espiado

//     // Verificar que isLogged haya sido llamado
//     expect(isLoggedSpy).toHaveBeenCalled();
//     expect(isLoggedSpy()).toBeTrue();

//     // Verificar el valor que retorna isLogged
//     //expect(result).toBeTrue(); // Debería retornar true porque el token está presente en localStorage
//   });
// });
