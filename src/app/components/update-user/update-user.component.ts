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
  imports: [],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  avatar: null | File = null;

  upDateUserForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    firstname: new FormControl('', {
      validators: [Validators.required],
    }),
    lastname: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    avatar: new FormControl(null, {
      validators: [Validators.required],
    }),
    address: new FormControl('', {
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl('', {
      validators: [Validators.required],
    }),
    image: new FormControl(null, {
      validators: [Validators.required],
    }),
  });
}
