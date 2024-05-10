import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ApiException } from '../../../models/api-exception.model';
import { Subscription } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../../models/helpers/pagination';
import { MemberParams } from '../../../models/helpers/member-params';
import { PaginatedResult } from '../../../models/helpers/paginatedResult';
import { UserService } from '../../../services/user.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-list-apiexceptions',
  standalone: true,
  templateUrl: './list-apiexceptions.component.html',
  styleUrl: './list-apiexceptions.component.scss',
  imports: [CommonModule, MatPaginatorModule, MatExpansionModule],
})
export class ListApiexceptionsComponent implements OnInit, OnDestroy {
  // adminService = inject(AdminService);
  userService = inject(UserService);

  private readonly baseApiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  apiExceptions: ApiException[] | undefined;

  subscribed: Subscription | undefined;
  pageSizeOptions = [5, 10, 15, 20];
  pageEvent: PageEvent | undefined;
  pagination: Pagination | undefined;
  memberParams: MemberParams | undefined;

  ngOnInit(): void {
    this.memberParams = new MemberParams();

    this.getAll();
  }

  ngOnDestroy(): void {
    this.subscribed?.unsubscribe();
  }

  getAll(): void {
    if (this.memberParams)
      this.subscribed = this.userService.getAllApiException(this.memberParams).subscribe({
        next: (response: PaginatedResult<ApiException[]>) => {
          if (response.body && response.pagination) {
            this.apiExceptions = response.body;
            console.log("APIEXCEPTIONS:", this.apiExceptions);
            this.pagination = response.pagination;
            console.log("PAGINATION:", this.pagination);
          }
        }
      });
  }

  // showApiException(): void {
  //   this.http.get<ApiException[]>(this.baseApiUrl + 'apiexception').subscribe(
  //     { next: response => this.apiExceptions = response }
  //   );
  // }

  handlePageEvent(e: PageEvent) {
    if (this.memberParams) {
      if (e.pageSize !== this.memberParams.pageSize)
        e.pageIndex = 0;

      this.pageEvent = e;
      this.memberParams.pageSize = e.pageSize;
      this.memberParams.pageNumber = e.pageIndex + 1;

      this.getAll();
    }
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
