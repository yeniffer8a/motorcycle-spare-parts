import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Router, RouterLinkWithHref } from '@angular/router';
import { UserService } from '../../services/user.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLinkWithHref],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userService = inject(UserService);
  router = inject(Router);
  //private authService = inject(AuthService);
  error = signal('');

  login = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.login.valid) {
      this.userService
        .login(this.login.value as { email: string; password: string })
        .subscribe({
          next: (response: any) => {
            console.log(response);
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error(error);
            this.error.set(error.error);
          },
        });
    }
  }
  isLogged() {
    return this.userService.isLogged();
  }
}
