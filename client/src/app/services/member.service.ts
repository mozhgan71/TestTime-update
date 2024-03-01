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
  getMemberById(id: string | null): Observable<AppUser | null | undefined> {
    return this.http.get<AppUser>(this.baseApiUrl + 'get-by-id/' + id).pipe(
      map((member: AppUser | null) => {
        if (member)
          return member;

        return null;
      })
    )
  }
  getMemberByEmail(emailInput: string): Observable<Member | null> {
    return this.http.get<Member>(this.baseApiUrl + 'get-by-email/' + emailInput); //localhost:5000/api/member/get-by-email/a2@a.com
  }

  constructor() { }
}
