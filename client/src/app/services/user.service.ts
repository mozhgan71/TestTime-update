import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppUser } from '../models/app-user.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  private readonly baseApiUrl = environment.apiUrl + 'user/';

  getAllUsers(): Observable<AppUser[] | null> {
    return this.http.get<AppUser[]>(this.baseApiUrl).pipe(
      map((users: AppUser[]) => {
        if (users)
          return users;

        return null;
      })
    )
  }

  getUserById(id: string | null): Observable<AppUser | null> {
    return this.http.get<AppUser>(this.baseApiUrl + 'get-by-id/' + id).pipe(
      map((user: AppUser | null) => {
        if (user)
          return user;

        return null;
      })
    )
  }
}