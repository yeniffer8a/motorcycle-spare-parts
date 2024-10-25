import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-view-profile-data',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './view-profile-data.component.html',
  styleUrl: './view-profile-data.component.css',
})
export class ViewProfileDataComponent {
  userService = inject(UserService);
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
}
