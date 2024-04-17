import { PLATFORM_ID, inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { LoggedInUser } from '../models/logged-in-user.model';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    // const token = localStorage.getItem('token');

    // if (token) {
    //   req = req.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    // }
    const loggedInUserStr: string | null = localStorage.getItem('loggedInUser');

    if (loggedInUserStr) {
      const loggedInUser: LoggedInUser = JSON.parse(loggedInUserStr);

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedInUser.token}`
        }
      });
    }
  }

  return next(req);
}