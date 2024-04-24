import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Result } from '../../../models/result.model';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { MemberParams } from '../../../models/helpers/member-params';
import { Subscription } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../../models/helpers/pagination';
import { UserService } from '../../../services/user.service';
import { PaginatedResult } from '../../../models/helpers/paginatedResult';

@Component({
  standalone: true,
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  imports: [CommonModule, MatIconModule, RouterModule, MatPaginatorModule]
})
export class ResultsComponent implements OnInit, OnDestroy {
  userService = inject(UserService);

  userId = sessionStorage.getItem('user-id');

  private readonly baseApiUrl = environment.apiUrl;

  private readonly apiUrl = environment.apiUrl + 'result/get-by-user-id/' + this.userId;

  private http = inject(HttpClient);

  resultRes: Result[] | undefined;
  delResult: Result | undefined;

  subscribed: Subscription | undefined;
  readonly pageSizeOptions = [1, 2, 3, 4, 5];
  pageEvent: PageEvent | undefined;
  pagination: Pagination | undefined;
  memberParams: MemberParams | undefined

  ngOnInit(): void {
    this.memberParams = new MemberParams();

    this.showResultByUserId();
  }

  ngOnDestroy(): void {
    this.subscribed?.unsubscribe();
  }

  showResultByUserId() {
    if (this.memberParams)
      this.subscribed = this.userService.getMyResults(this.apiUrl, this.memberParams).subscribe({
        next: (response: PaginatedResult<Result[]>) => {
          if (response.body && response.pagination) {
            this.resultRes = response.body;
            console.log("RESULTS:", this.resultRes);
            this.pagination = response.pagination;
            console.log("PAGINATION:", this.pagination);
          }
        }
      });
  }

  // showResultByUserId() {
  //   var userId = sessionStorage.getItem('user-id');

  //   this.http.get<Result[]>(this.baseApiUrl + 'result/get-by-user-id/' + userId).subscribe(
  //     {
  //       next: res => {
  //         this.resultRes = res;
  //         console.log(res);
  //       },
  //     }
  //   );
  // }

  handlePageEvent(e: PageEvent) {
    if (this.memberParams) {
      if (e.pageSize !== this.memberParams.pageSize)
        e.pageIndex = 0;

      this.pageEvent = e;
      this.memberParams.pageSize = e.pageSize;
      this.memberParams.pageNumber = e.pageIndex + 1;

      this.showResultByUserId();
    }
  }

  deleteResult(i: number, id: string): void {
    this.http.delete<Result>(this.baseApiUrl + 'result/delete/' + id).subscribe(
      {
        next: response => {
          this.delResult = response
          console.log(response);
          alert(" حذف کارنامه با موفقیت انجام شد.");
          this.resultRes!.splice(i, 1);
        }
      }
    );
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}