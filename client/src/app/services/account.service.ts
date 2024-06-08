import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { AppUserRegister } from '../models/app-user-register.model';
import { environment } from '../../environments/environment.development';
import { LoggedInUser } from '../models/logged-in-user.model';
import { isPlatformBrowser } from '@angular/common';
import { ApiResponse } from '../models/helpers/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private router = inject(Router);
  platformId = inject(PLATFORM_ID);

  private readonly baseApiUrl = environment.apiUrl + 'account/';

  private currentUserSource = new BehaviorSubject<LoggedInUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  loggedInUserSig = signal<LoggedInUser | null>(null);

  registerUser(userInput: AppUserRegister): Observable<LoggedInUser | null> {
    return this.http.post<LoggedInUser>(this.baseApiUrl + 'register', userInput).pipe(
      map(userResponse => {
        if (userResponse) {
          this.setCurrentUser(userResponse);

          return userResponse;
        }

        return null;
      })
    );
  }

  logIn(userLogInEmail: string, userLogInPassword: string): Observable<LoggedInUser | null> {

    return this.http.get<LoggedInUser>(this.baseApiUrl + 'login/' + userLogInEmail + '/' + userLogInPassword)
      .pipe(
        map(user => {
          if (user) {
            this.loggedInUserSig.set(user);

            this.router.navigateByUrl('/user-profile');

            this.setCurrentUser(user);

            this.navigateToReturnUrl(); // navigate to the url which user tried before log-in

            return user;
          }

          return null;
        })
      );
  }

  // get logged-in user when browser is refreshed
  // getLoggedInUser(): Observable<LoggedInUser | null> {
  //   return this.http.get<LoggedInUser>(this.baseApiUrl);
  // }

  authorizeLoggedInUser(): void {
    this.http.get<ApiResponse>(this.baseApiUrl)
      .pipe(
        take(1))
      .subscribe({
        next: res => console.log(res.message),
        error: err => {
          console.log(err.error);
          this.logOut()
        }
      });
  }

  setCurrentUser(loggedInUser: LoggedInUser): void {
    this.setLoggedInUserRoles(loggedInUser);

    this.loggedInUserSig.set(loggedInUser);

    if (isPlatformBrowser(this.platformId)) // we make sure this code is ran on the browser and NOT server
      // localStorage.setItem('token', loggedInUser.token);
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }

  setLoggedInUserRoles(loggedInUser: LoggedInUser): void {
    loggedInUser.roles = []; // We have to initialize it before pushing. Otherwise, it's 'undefined' and push will not work. 

    const roles: string | string[] = JSON.parse(atob(loggedInUser.token.split('.')[1])).role; // get the token's 2nd part then select role

    Array.isArray(roles) ? loggedInUser.roles = roles : loggedInUser.roles.push(roles);
  }

  logOut(): void {
    this.loggedInUserSig.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      sessionStorage.removeItem('user-id');
    }

    this.router.navigate([''])
  }

  private navigateToReturnUrl(): void {
    const returnUrl = localStorage.getItem('returnUrl');
    if (returnUrl)
      this.router.navigate([returnUrl]);
    else
      this.router.navigate(['user-profile']);

    if (isPlatformBrowser(this.platformId)) // we make sure this code is ran on the browser and NOT server
      localStorage.removeItem('returnUrl');
  }
}