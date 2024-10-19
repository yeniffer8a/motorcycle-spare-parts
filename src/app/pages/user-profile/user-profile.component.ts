import { Component, inject, Input, signal } from '@angular/core';
import { UpdateUserAddressComponent } from '../../components/update-user-address/update-user-address.component';
import { UpdateUserComponent } from '../../components/update-user/update-user.component';
import { UserPurchaseHistoryComponent } from '../../components/user-purchase-history/user-purchase-history.component';
import { UserService } from '../../services/user.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterLinkWithHref,
    UpdateUserAddressComponent,
    UpdateUserComponent,
    UserPurchaseHistoryComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  userService = inject(UserService);

  user = this.userService.user;

  ngOnInit() {
    this.userService.getOneUser().subscribe({
      next: (response: any) => {
        console.log(response);
        this.userService.user.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
