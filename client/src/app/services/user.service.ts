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
import { Question } from '../models/question.model';
import { Member } from '../models/member-model';
import { Suggestion } from '../models/suggestion.model';
import { ApiException } from '../models/api-exception.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  userId = sessionStorage.getItem('user-id');

  private readonly apiUrlReult = environment.apiUrl + 'result/get-by-user-id/' + this.userId;
  private readonly baseApiUrlQuestion = environment.apiUrl + 'question/';
  private readonly baseApiUrl = environment.apiUrl + 'member/';
  private readonly baseApiUrlSuggestion = environment.apiUrl + 'suggestion/';
  private readonly baseApiUrlUserQuestion = environment.apiUrl + 'userquestion/';
  private readonly baseApiUrlApiException = environment.apiUrl + 'apiexception/';


  private readonly apiUrl = environment.apiUrl + 'user/';

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

  //pagination methods

  getMyResults(url: string, memberParams: MemberParams): Observable<PaginatedResult<Result[]>> {

    let params = new HttpParams();

    if (memberParams) {
      params = params.append('pageNumber', memberParams.pageNumber);
      params = params.append('pageSize', memberParams.pageSize);
    }

    return this.paginationHandler.getPaginatedResult<Result[]>(this.apiUrlReult, params);
  }

  getAllQuestions(memberParams: MemberParams): Observable<PaginatedResult<Question[]>> {
    let params = new HttpParams();

    if (memberParams) {
      params = params.append('pageNumber', memberParams.pageNumber);
      params = params.append('pageSize', memberParams.pageSize);
    }

    return this.paginationHandler.getPaginatedResult<Question[]>(this.baseApiUrlQuestion, params);
  }

  getAllMembers(memberParams: MemberParams): Observable<PaginatedResult<Member[]>> {
    let params = new HttpParams();

    if (memberParams) {
      params = params.append('pageNumber', memberParams.pageNumber);
      params = params.append('pageSize', memberParams.pageSize);
    }

    return this.paginationHandler.getPaginatedResult<Member[]>(this.baseApiUrl, params);
  }

  getAllSuggestion(memberParams: MemberParams): Observable<PaginatedResult<Suggestion[]>> {
    let params = new HttpParams();

    if (memberParams) {
      params = params.append('pageNumber', memberParams.pageNumber);
      params = params.append('pageSize', memberParams.pageSize);
    }

    return this.paginationHandler.getPaginatedResult<Suggestion[]>(this.baseApiUrlSuggestion, params);
  }

  getAllUserQuestion(memberParams: MemberParams): Observable<PaginatedResult<Question[]>> {
    let params = new HttpParams();

    if (memberParams) {
      params = params.append('pageNumber', memberParams.pageNumber);
      params = params.append('pageSize', memberParams.pageSize);
    }

    return this.paginationHandler.getPaginatedResult<Question[]>(this.baseApiUrlUserQuestion, params);
  }

  getAllApiException(memberParams: MemberParams): Observable<PaginatedResult<ApiException[]>> {
    let params = new HttpParams();

    if (memberParams) {
      params = params.append('pageNumber', memberParams.pageNumber);
      params = params.append('pageSize', memberParams.pageSize);
    }

    return this.paginationHandler.getPaginatedResult<ApiException[]>(this.baseApiUrlApiException, params);
  }
}