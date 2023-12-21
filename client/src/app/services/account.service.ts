import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AppUser } from '../models/app-user.model';
import { Router } from '@angular/router';
import { AppUserRegister } from '../models/app-user-register.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly baseApiUrl = environment.apiUrl +'account/';

  private currentUserSource = new BehaviorSubject<AppUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  registerUser(userInput: AppUserRegister): Observable<AppUser | null> {
    return this.http.post<AppUser>(this.baseApiUrl + 'register', userInput).pipe(
      map(userResponse => {
        if (userResponse) {
          this.setCurrentUser(userResponse);

          return userResponse;
        }

        return null;
      })
    );
  }

  logIn(userLogInEmail: string, userLogInPassword: string): Observable<AppUser | null> {

    return this.http.get<AppUser>(this.baseApiUrl + 'login/' + userLogInEmail + '/' + userLogInPassword)
      .pipe(
        map(user => {
          if (user) {
            this.currentUserSource.next(user);

            this.router.navigateByUrl('/user-profile');

            this.setCurrentUser(user);

            return user;
          }

          return null;
        })
      );
  }

  setCurrentUser(user: AppUser): void {
    const userString = JSON.stringify(user);

    this.currentUserSource.next(user);
    localStorage.setItem('user', userString)

    this.currentUserSource.next(user);
  }

  logOut(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigate([''])
  }
}