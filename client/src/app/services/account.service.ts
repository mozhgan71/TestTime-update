import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AppUser } from '../models/app-user.model';
import { Router } from '@angular/router';
import { AppUserRegister } from '../models/app-user-register.model';
import { environment } from '../../environments/environment.development';
import { LoggedInUser } from '../models/logged-in-user.model';
import { isPlatformBrowser } from '@angular/common';

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

            return user;
          }

          return null;
        })
      );
  }

  // get logged-in user when browser is refreshed
  getLoggedInUser(): Observable<LoggedInUser | null> {
    return this.http.get<LoggedInUser>(this.baseApiUrl);
  }

  setCurrentUser(loggedInUser: LoggedInUser): void {
    // const userString = JSON.stringify(user);

    // this.currentUserSource.next(user);
    // localStorage.setItem('user', userString)

    // this.currentUserSource.next(user);
    this.loggedInUserSig.set(loggedInUser);

    if (isPlatformBrowser(this.platformId)) // we make sure this code is ran on the browser and NOT server
    {
      localStorage.setItem('token', loggedInUser.token);
    }

    this.navigateToReturnUrl(); // navigate to the url which user tried before log-in
  }

  logOut(): void {
    this.loggedInUserSig.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }

    this.router.navigate([''])
  }

  private navigateToReturnUrl(): void {
    const returnUrl = localStorage.getItem('returnUrl');
    if (returnUrl)
      this.router.navigate([returnUrl]);
    // else
    //   this.router.navigate(['user-profile']);

    if (isPlatformBrowser(this.platformId)) // we make sure this code is ran on the browser and NOT server
      localStorage.removeItem('returnUrl');
  }
}