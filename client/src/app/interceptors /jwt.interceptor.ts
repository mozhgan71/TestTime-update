import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../services/account.service';
import { AppUser } from '../models/app-user.model';
import { take } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  inject(AccountService).currentUser$.pipe(take(1)).subscribe({
    next: (currentUser: AppUser | null) => {
      if (currentUser) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
    }
  });

  return next(req);
}