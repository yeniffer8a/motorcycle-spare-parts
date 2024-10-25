import { Component, inject, Input, signal } from '@angular/core';

import { UpdateUserComponent } from '../../components/update-user/update-user.component';
import { UserPurchaseHistoryComponent } from '../../components/user-purchase-history/user-purchase-history.component';
import { UserService } from '../../services/user.service';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ViewProfileDataComponent } from '../../components/view-profile-data/view-profile-data.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterLinkWithHref,
    UpdateUserComponent,
    UserPurchaseHistoryComponent,
    ViewProfileDataComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  userService = inject(UserService);
  authService = inject(AuthService);
  user = this.userService.user;
  router = inject(Router);

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

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/']);
  }
}
