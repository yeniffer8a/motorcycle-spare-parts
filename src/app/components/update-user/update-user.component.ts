import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
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
  avatar: null | File = null;

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
    password: new FormControl(this.user()?.password, {
      validators: [Validators.required],
    }),
    address: new FormControl(this.user()?.address, {
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl(this.user()?.phoneNumber, {
      validators: [Validators.required],
    }),
    image: new FormControl(this.user()?.image),
  });

  // ngOnInit() {
  //   this.upDateUserForm.get('username')?.setValue(this.user()?.username!);
  // }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatar = file;
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
    if (this.avatar) {
      formData.append('image', this.avatar, this.avatar.name);
    }
    console.log(formData.getAll('image'));
    return formData;
  }

  onSubmit() {
    if (this.upDateUserForm.valid && this.avatar) {
      const formData = this.toFormData(this.upDateUserForm.value);
      this.userService.upDateUserForm(formData).subscribe({
        next: (response) => {
          this.router.navigate(['/updateUser']);
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
