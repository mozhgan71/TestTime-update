import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../services/account.service';
import { AppUser } from '../models/app-user.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (currentUser: AppUser | null) => {
        if (currentUser) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${currentUser.token}`
            }
          });
        }
      }
    });

    return next.handle(request);
  }
}