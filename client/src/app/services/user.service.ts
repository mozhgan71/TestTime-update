import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppUser } from '../models/app-user.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ApiResponse } from '../models/helpers/apiResponse.model';
import { UserUpdate } from '../models/user-update.model';
import { MemberParams } from '../models/helpers/member-params';
import { PaginatedResult } from '../models/helpers/paginatedResult';
import { Result } from '../models/result.model';
import { PaginationHandler } from '../extensions/paginationHandler';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  userId = sessionStorage.getItem('user-id');

  private readonly apiUrl = environment.apiUrl + 'result/get-by-user-id/' + this.userId;

  private paginationHandler = new PaginationHandler();

  updateUser(userUpdate: UserUpdate): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.apiUrl, userUpdate);
  }

  setMainPhoto(url_165In: string): Observable<ApiResponse> {
    let queryParams = new HttpParams().set('photoUrlIn', url_165In);

    return this.http.put<ApiResponse>(this.apiUrl + 'set-main-photo', null, { params: queryParams });
  }

  deletePhoto(url_165In: string): Observable<ApiResponse> {
    let queryParams = new HttpParams().set('photoUrlIn', url_165In);

    return this.http.put<ApiResponse>(this.apiUrl + 'delete-photo', null, { params: queryParams });
  }

  getMyResults(url: string, memberParams: MemberParams): Observable<PaginatedResult<Result[]>> {

    let params = new HttpParams();

    if (memberParams) {
      params = params.append('pageNumber', memberParams.pageNumber);
      params = params.append('pageSize', memberParams.pageSize);
    }

    return this.paginationHandler.getPaginatedResult<Result[]>(this.apiUrl, params);
  }
}