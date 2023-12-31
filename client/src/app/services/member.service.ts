import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AppUser } from '../models/app-user.model';
import { Member } from '../models/member-model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient);

  private readonly baseApiUrl = environment.apiUrl + 'member/'; 

  getAllMembers(): Observable<Member[] | null> {
    return this.http.get<Member[]>(this.baseApiUrl).pipe(
      map((members: Member[]) => {
        if (members)
          return members;

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
