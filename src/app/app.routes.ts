import { Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UpdateUserAddressComponent } from './components/update-user-address/update-user-address.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserPurchaseHistoryComponent } from './components/user-purchase-history/user-purchase-history.component';
import { importProvidersFrom } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
export const routes: Routes = [
     {path:'',component:HomeComponent},
    {path:'updateUserAddress',component: UpdateUserAddressComponent},
    {path:'updateUser',component:UpdateUserComponent},
    {path:'userPurchaseHistory',component:UserPurchaseHistoryComponent},
    {path: 'user', component:UserProfileComponent }
    ];
