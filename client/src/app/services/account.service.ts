import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AppUser } from '../models/app-user.model';
import { Router } from '@angular/router';
import { AppUserRegister } from '../models/app-user-register.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<AppUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(userInput: AppUserRegister): Observable<AppUser | null> {
    return this.http.post<AppUser>('https://localhost:5001/api/account/register', userInput).pipe(
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

    return this.http.get<AppUser>('https://localhost:5001/api/account/login/' + userLogInEmail + '/' + userLogInPassword)
      .pipe(
        map(user => {
          if (user) {
            this.currentUserSource.next(user);

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