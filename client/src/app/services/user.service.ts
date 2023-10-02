import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AppUser } from '../models/app-user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSource = new BehaviorSubject<AppUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  logIn(userLogInEmail: string, userLogInPassword: string): Observable<AppUser | null> {

    return this.http.get<AppUser>('http://localhost:5000/api/user/get-by-email-password/' + userLogInEmail + '/' + userLogInPassword)
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