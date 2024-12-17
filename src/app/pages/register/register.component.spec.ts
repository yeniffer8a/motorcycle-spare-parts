// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RegisterComponent } from './register.component';
// import { UserService } from '../../services/user.service';
// import { Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
// import { User } from '../../../../types/User';
// import { of, throwError } from 'rxjs';

// describe('RegisterComponent Test', () => {
//   let component: RegisterComponent;
//   let fixture: ComponentFixture<RegisterComponent>;
//   let userServiceSpy: jasmine.SpyObj<UserService>;
//   let routerSpy: jasmine.SpyObj<Router>;
//   let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>; // Declarar ActivatedRoute mock

//   const username = 'testuser';
//   const firstName = 'John';
//   const lastName = 'Doe';
//   const email = 'john.doe@example.com';
//   const password = 'password123';
//   const confirmPassword = 'password123';
//   const confirmPasswordError = 'password456'; // Contraseña no coincide
//   const phoneNumber = '1234567890';
//   const address = '123 Main St';
//   //const image = new File([''], 'image.png');
//   const formData = {
//     username: username,
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     password: password,
//     confirmPassword: confirmPassword,
//     phoneNumber: phoneNumber,
//     address: address,
//     // image: null,
//   };
//   const formDataError = {
//     username: username,
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     password: password,
//     confirmPassword: confirmPasswordError,
//     phoneNumber: phoneNumber,
//     address: address,
//     // image: null,
//   };

//   beforeEach(async () => {
//     const userSpy = jasmine.createSpyObj('UserService', ['register']);
//     const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
//     const activatedRouteSpyObj = jasmine.createSpyObj('ActivatedRoute', [], {
//       snapshot: { paramMap: {} },
//     }); //

//     await TestBed.configureTestingModule({
//       providers: [
//         {
//           provide: UserService,
//           useValue: userSpy,
//         },
//         { provide: Router, useValue: routerSpyObj },
//         { provide: ActivatedRoute, useValue: activatedRouteSpyObj },
//       ],
//     }).compileComponents();
//     fixture = TestBed.createComponent(RegisterComponent);
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

//   it('should submit the form with valid data', () => {
//     // Mock de la imagen
//     // const file = new File([''], 'image.png');
//     // component.image = file;

//     // Rellenar el formulario con datos válidos
//     component.register.setValue({
//       username: username,
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       password: password,
//       confirmPassword: confirmPassword,
//       phoneNumber: phoneNumber,
//       address: address,
//       // image: null,
//     });

//     fixture.detectChanges();

//     const registerSpy = userServiceSpy.register.and.returnValue(of({}));
//     component.onSubmit();

//     // Verificamos que el método register haya sido llamado
//     expect(registerSpy).toHaveBeenCalled();
//     expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
//   });

//   it('Should show error message when passwords do not match', () => {
//     component.register.setValue(formDataError);

//     component.onSubmit();

//     // Verificamos que se haya mostrado el error de contraseña no coincidente
//     expect(component.error()).toBe('Las contraseñas no coinciden');
//   });

//   it('should show error message when the form is invalid', () => {
//     component.register.setValue({
//       username: '',
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       phoneNumber: '',
//       address: '',
//     });

//     component.onSubmit();

//     // Verificamos que el error de formulario no válido se muestre
//     expect(component.error()).toBe('Llenar todos los campos');
//   });

//   //   it('should handle registration error', () => {
//   //     // Simulamos una respuesta de error en el registro
//   //     //const formData = new FormData();
//   //     userServiceSpy.register.and.returnValue(
//   //       throwError(() => new Error('Registro fallido'))
//   //     );

//   //     component.register.setValue({
//   //       username: 'testuser',
//   //       firstName: 'John',
//   //       lastName: 'Doe',
//   //       email: 'john.doe@example.com',
//   //       password: 'password123',
//   //       confirmPassword: 'password123',
//   //       phoneNumber: '1234567890',
//   //       address: '123 Main St',
//   //     });

//   //     component.onSubmit();

//   //     // Verificamos que el mensaje de error haya sido actualizado
//   //     expect(component.error()).toBe('Registro fallido');
//   //   });

//   it('Should display an error if registration fails', () => {
//     const formData = new FormData();
//     component.register.setValue({
//       username: 'testuser',
//       firstName: 'Test',
//       lastName: 'User',
//       email: 'testuser@example.com',
//       password: 'password123',
//       confirmPassword: 'password123',
//       phoneNumber: '1234567890',
//       address: 'Test address',
//     });

//     userServiceSpy.register.and.returnValue(
//       throwError(() => new Error('Error durante el registro'))
//     );
//     component.onSubmit();

//     expect(component.error()).toBe('Error durante el registro');
//   });
// });
