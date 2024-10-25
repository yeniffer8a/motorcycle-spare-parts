import { Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserPurchaseHistoryComponent } from './components/user-purchase-history/user-purchase-history.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { isLoggedGuard } from './guards/is-logged.guard';
import { redirectIfLoggedGuard } from './guards/redirect-if-logged.guard';
import { ProductsComponent } from './pages/products/products.component';
import { importProvidersFrom } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ViewEncapsulation } from '@angular/compiler';
import { ViewProfileDataComponent } from './components/view-profile-data/view-profile-data.component';
import { redirectIfNotLoggedGuard } from './guards/redirect-if-not-logged.guard';
import { ReportingErrorToUserComponent } from './components/reporting-error-to-user/reporting-error-to-user.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'user',
    component: UserProfileComponent,
    canActivate: [redirectIfNotLoggedGuard],
  },
  { path: 'updateUser', component: UpdateUserComponent },
  { path: 'userPurchaseHistory', component: UserPurchaseHistoryComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [isLoggedGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [redirectIfLoggedGuard],
  },
  { path: 'products', component: ProductsComponent },
  { path: 'productDetail', component: ProductDetailComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
