import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Question } from '../../../models/question.model';
import { environment } from '../../../../environments/environment.development';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AdminService } from '../../../services/admin.service';
import { Subscription } from 'rxjs';
import { Pagination } from '../../../models/helpers/pagination';
import { MemberParams } from '../../../models/helpers/member-params';
import { PaginatedResult } from '../../../models/helpers/paginatedResult';
import { UserService } from '../../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-list-userquestions',
  templateUrl: './list-userquestions.component.html',
  styleUrls: ['./list-userquestions.component.scss'],
  imports: [CommonModule, MatPaginatorModule]
})
export class ListUserQuestionsComponent implements OnInit, OnDestroy {
  // adminService = inject(AdminService);
  userService = inject(UserService);

  private readonly baseApiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  userquestions: Question[] | undefined;

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
      this.subscribed = this.userService.getAllUserQuestion(this.memberParams).subscribe({
        next: (response: PaginatedResult<Question[]>) => {
          if (response.body && response.pagination) {
            this.userquestions = response.body;
            console.log("USERQUESTIONS:", this.userquestions);
            this.pagination = response.pagination;
            console.log("PAGINATION:", this.pagination);
          }
        }
      });
  }

  // showUserQuestion(): void {
  //   this.http.get<Question[]>(this.baseApiUrl + 'userquestion/').subscribe(
  //     { next: response => this.userquestions = response }
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