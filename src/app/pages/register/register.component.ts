import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  image: File | null = null;
  error = signal('');

  register = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl('', {
      validators: [Validators.required],
    }),
    address: new FormControl('', {
      validators: [Validators.required],
    }),
    image: new FormControl(null, {
      validators: [Validators.required],
    }),
  });

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.image = file;
    }
  }

  toFormData(formValue: any) {
    const formData = new FormData();
    for (const key in formValue) {
      if (
        formValue.hasOwnProperty(key) &&
        formValue[key] !== null &&
        formValue[key] !== undefined
      ) {
        formData.append(key, formValue[key]);
      }
    }
    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }
    console.log(formData.getAll('image'));
    return formData;
  }
  onSubmit() {
    console.log(this.register.value.confirmPassword);
    if (this.register.value.password !== this.register.value.confirmPassword) {
      this.error.set('Las contraseñas no coinciden');
      return;
    }
    if (this.register.valid && this.image) {
      const formData = this.toFormData(this.register.value);
      this.userService.register(formData).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error durante el registro:', error);
          this.error.set(error.error);
        },
      });
    } else {
      console.error('El formulario no es válido.');
      this.error.set('Llenar todos los campos');
    }
  }
}
