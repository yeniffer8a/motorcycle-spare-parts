// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { UserProfileComponent } from './user-profile.component';
// import { UserService } from '../../services/user.service';
// import { AuthService } from '../../services/auth.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { User } from '../../../../types/User';

// describe('UserProfileComponent Test', () => {
//   let component: UserProfileComponent;
//   let fixture: ComponentFixture<UserProfileComponent>;
//   let userServiceSpy: jasmine.SpyObj<UserService>;
//   let authServiceSpy: jasmine.SpyObj<AuthService>;
//   let routerSpy: jasmine.SpyObj<Router>;
//   let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

//   const mockFakeToken = { token: 'fake-token' };
//   const user = {
//     _id: '1',
//     username: 'TestUser',
//     firstName: 'Test',
//     lastName: 'User',
//     email: 'testuser@example.com',
//     password: 'password123',
//     age: 30,
//     address: '123 Test Street',
//     phoneNumber: 1234567890,
//     image: 'imageurl.jpg',
//     roleCode: 1,
//     __v: 0,
//   };
//   beforeEach(async () => {
//     const userSpy = jasmine.createSpyObj('UserService', ['getOneUser']);
//     const authSpy = jasmine.createSpyObj('AuthService', ['removeToken']);
//     const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
//     const activatedRouteSpyObj = jasmine.createSpyObj('ActivatedRoute', [], {
//       snapshot: { paramMap: {} },
//     });

//     await TestBed.configureTestingModule({
//       providers: [
//         { provide: UserService, useValue: userSpy },
//         { provide: Router, useValue: routerSpyObj },
//         { provide: ActivatedRoute, useValue: activatedRouteSpyObj },
//         { provide: AuthService, useValue: authSpy },
//       ],
//     }).compileComponents();
//     fixture = TestBed.createComponent(UserProfileComponent);
//     component = fixture.componentInstance;
//     userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
//     authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
//     routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//     activatedRouteSpy = TestBed.inject(
//       ActivatedRoute
//     ) as jasmine.SpyObj<ActivatedRoute>;

//     fixture.detectChanges();
//   });

//   it('Should create a component', () => {
//     expect(component).toBeTruthy();
//   });

//   //   it('Should allow to get one user', () => {});
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { User } from '../../../../types/User';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserProfileComponent Test', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  const user = {
    _id: '1',
    username: 'TestUser',
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    password: 'password123',
    age: 30,
    address: '123 Test Street',
    phoneNumber: 1234567890,
    image: 'imageurl.jpg',
    roleCode: 1,
    __v: 0,
  };

  beforeEach(async () => {
    const userSpy = jasmine.createSpyObj('UserService', ['getOneUser']);
    const authSpy = jasmine.createSpyObj('AuthService', ['removeToken']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpyObj = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { paramMap: {} },
    });

    await TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: Router, useValue: routerSpyObj },
        { provide: AuthService, useValue: authSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRouteSpy = TestBed.inject(
      ActivatedRoute
    ) as jasmine.SpyObj<ActivatedRoute>;

    fixture.detectChanges();
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy(); // Verificar que el componente se haya creado correctamente
  });

  // it('Should fetch user data on init', () => {
  //   const userSpy = userServiceSpy.getOneUser.and.returnValue(of(user)); // Espiar la llamada a getOneUser
  //   component.ngOnInit(); // Llamar al método ngOnInit
  //   expect(userSpy).toHaveBeenCalled(); // Verificar que se haya llamado a getOneUser
  //   expect(component.user()).toEqual(user); // Verificar que los datos del usuario sean los esperados
  // });

  // it('Should handle user data fetch error', () => {
  //   // Simular un error al obtener el usuario
  //   const userSpy = userServiceSpy.getOneUser.and.returnValue(
  //     throwError(() => new Error('Error durante la busqueda'))
  //   );
  //   component.ngOnInit(); // Llamar a ngOnInit

  //   expect(userSpy).toHaveBeenCalled();
  //   expect(component.error()).toBe('Error durante la busqueda');
  // });

  // it('Should logout the user and navigate to home', () => {
  //   const authSpy = authServiceSpy.removeToken.and.returnValue(); // Espiar el método removeToken
  //   component.logout(); // Llamar al método logout
  //   expect(authSpy).toHaveBeenCalled(); // Verificar que se haya llamado removeToken
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/']); // Verificar que la navegación haya ocurrido
  // });
});
