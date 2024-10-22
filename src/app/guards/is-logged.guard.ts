import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('token')) {
    router.navigate(['/user']);
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
