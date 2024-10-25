import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  private userService = inject(UserService);
  user = this.userService.user;
  private router = inject(Router);
  image: null | File = null;

  upDateUserForm = new FormGroup({
    username: new FormControl(this.user()?.username, {
      validators: [Validators.required],
    }),
    firstName: new FormControl(this.user()?.firstName, {
      validators: [Validators.required],
    }),
    lastName: new FormControl(this.user()?.lastName, {
      validators: [Validators.required],
    }),
    email: new FormControl(this.user()?.email, {
      validators: [Validators.required],
    }),
    password: new FormControl(''),
    Cpassword: new FormControl(''),

    address: new FormControl(this.user()?.address, {
      validators: [Validators.required],
    }),

    phoneNumber: new FormControl(this.user()?.phoneNumber, {
      validators: [Validators.required],
    }),
    image: new FormControl(null),
  });

  // ngOnInit() {
  //   this.upDateUserForm.get('username')?.setValue(this.user()?.username!);
  // }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.image = file;
    }
  }

  toFormData(formValue: any) {
    const formData = new FormData();

    for (const key in formValue) {
      console.log(formValue);
      if (
        formValue.hasOwnProperty(key) &&
        formValue[key] !== null &&
        formValue[key] !== undefined &&
        formValue[key] !== ''
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
    if (this.upDateUserForm.valid) {
      const formData = this.toFormData(this.upDateUserForm.value);
      console.log('formData-->', formData.getAll('username'));
      this.userService.upDateUserForm(formData).subscribe({
        next: (response) => {
          console.log('envio--->', response);
          this.router.navigate(['/user']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      console.log('Campos no válidos');
    }
  }
}
