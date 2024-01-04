import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AppUser } from '../models/app-user.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient);

  private readonly baseApiUrl = environment.apiUrl + 'user/'; 

  getAllMembers(): Observable<AppUser[] | null> {
    return this.http.get<AppUser[]>(this.baseApiUrl).pipe(
      map((users: AppUser[]) => {
        if (users)
          return users;

        return null;
      })
    )
  }
  getMemberById(id: string | null): Observable<AppUser | null> {
    return this.http.get<AppUser>(this.baseApiUrl + 'get-by-id/' + id).pipe(
      map((user: AppUser | null) => {
        if (user)
          return user;

        return null;
      })
    )
  }

  constructor() { }
}
