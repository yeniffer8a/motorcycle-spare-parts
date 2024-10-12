import { Component } from '@angular/core';
import { UpdateUserAddressComponent } from '../../components/update-user-address/update-user-address.component';
import { UpdateUserComponent } from '../../components/update-user/update-user.component';
import { UserPurchaseHistoryComponent } from '../../components/user-purchase-history/user-purchase-history.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UpdateUserAddressComponent,UpdateUserComponent,UserPurchaseHistoryComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
