import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AppUser } from '../models/app-user.model';
import { Member } from '../models/member-model';
import { MemberParams } from '../models/helpers/member-params';
import { PaginatedResult } from '../models/helpers/paginatedResult';
import { PaginationHandler } from '../extensions/paginationHandler';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient);

  private readonly baseApiUrl = environment.apiUrl + 'member/';
  private paginationHandler = new PaginationHandler();

  getAllMembers(memberParams: MemberParams): Observable<PaginatedResult<Member[]>> {
    let params = new HttpParams();

    if (memberParams) {
      params = params.append('pageNumber', memberParams.pageNumber);
      params = params.append('pageSize', memberParams.pageSize);
    }

    return this.paginationHandler.getPaginatedResult<Member[]>(this.baseApiUrl, params);
  }

  // getAllMembers(): Observable<Member[] | null> {
  //   return this.http.get<Member[]>(this.baseApiUrl).pipe(
  //     map((members: Member[]) => {
  //       if (members)
  //         return members;

  //       return null;
  //     })
  //   )
  // }

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
}
