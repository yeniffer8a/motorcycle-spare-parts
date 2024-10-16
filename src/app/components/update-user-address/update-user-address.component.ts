import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-update-user-address',
  standalone: true,
  imports: [],
  templateUrl: './update-user-address.component.html',
  styleUrl: './update-user-address.component.css'
})
export class UpdateUserAddressComponent {
private userService = inject(UserService);

upDateShippingAddress = new FormGroup({
  
})
}
