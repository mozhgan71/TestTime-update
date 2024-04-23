import { Injectable } from '@angular/core';
import { MemberParams } from '../models/helpers/member-params';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../models/helpers/paginatedResult';
import { Question } from '../models/question.model';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { PaginationHandler } from '../extensions/paginationHandler';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly baseApiUrl = environment.apiUrl + 'question/';
  private paginationHandler = new PaginationHandler();

  getAllQuestions(memberParams: MemberParams): Observable<PaginatedResult<Question[]>> {
    let params = new HttpParams();

    if (memberParams) {
      params = params.append('pageNumber', memberParams.pageNumber);
      params = params.append('pageSize', memberParams.pageSize);
    }

    return this.paginationHandler.getPaginatedResult<Question[]>(this.baseApiUrl, params);
  }
}
