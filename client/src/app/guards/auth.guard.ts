import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const snackbar = inject(MatSnackBar);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    // const token: string | null = localStorage.getItem('token');
    const loggedInUserStr: string | null = localStorage.getItem('loggedInUser');

    if (loggedInUserStr) {
      return true;
    }

    snackbar.open('Please login first.', 'Close', {
      verticalPosition: 'bottom', // top
      horizontalPosition: 'center', // start, end
      duration: 5000
    });

    localStorage.setItem('returnUrl', state.url);

    router.navigate(['login'], { queryParams: { 'returnUrl': state.url } });
  }

  return false;
};
