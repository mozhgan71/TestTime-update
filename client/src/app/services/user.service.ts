import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<AppUser[] | null> {
    return this.http.get<AppUser[]>('https://localhost:5001/api/user/').pipe(
      map((users: AppUser[]) => {
        if (users)
          return users;

        return null;
      })
    )
  }

  getUserById(id: string | null): Observable<AppUser | null> {
    return this.http.get<AppUser>('https://localhost:5001/api/user/get-by-id/' + id).pipe(
      map((user: AppUser | null) => {
        if (user)
          return user;

        return null;
      })
    )
  }
}