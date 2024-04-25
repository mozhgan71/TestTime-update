import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Question } from '../../../models/question.model';
import { environment } from '../../../../environments/environment.development';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AdminService } from '../../../services/admin.service';
import { MemberParams } from '../../../models/helpers/member-params';
import { Subscription } from 'rxjs';
import { Pagination } from '../../../models/helpers/pagination';
import { PaginatedResult } from '../../../models/helpers/paginatedResult';
import { UserService } from '../../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-correct-answers',
  templateUrl: './correct-answers.component.html',
  styleUrls: ['./correct-answers.component.scss'],
  imports: [CommonModule, MatPaginatorModule]
})
export class CorrectAnswersComponent implements OnInit, OnDestroy {
  // adminService = inject(AdminService);
  userService = inject(UserService);
  
  private readonly baseApiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  questions: Question[] | undefined;

  subscribed: Subscription | undefined;
  readonly pageSizeOptions = [5, 10, 15, 20];
  pageEvent: PageEvent | undefined;
  pagination: Pagination | undefined;
  memberParams: MemberParams | undefined;

  ngOnInit(): void {
    this.memberParams = new MemberParams();

    this.showAnswerQuestion();
  }

  ngOnDestroy(): void {
    this.subscribed?.unsubscribe();
  }

  showAnswerQuestion(): void {
    if (this.memberParams)
      this.subscribed = this.userService.getAllQuestions(this.memberParams).subscribe({
        next: (response: PaginatedResult<Question[]>) => {
          if (response.body && response.pagination) {
            this.questions = response.body;
            console.log("QUESTIONS:", this.questions);
            this.pagination = response.pagination;
            console.log("PAGINATION:", this.pagination);
          }
        }
      });
  }

  // showAnswerQuestion(): void {
  //   this.http.get<Question[]>(this.baseApiUrl + 'question/').subscribe(
  //     { next: response => this.questions = response }
  //   );
  // }

  handlePageEvent(e: PageEvent) {
    if (this.memberParams) {
      if (e.pageSize !== this.memberParams.pageSize)
        e.pageIndex = 0;

      this.pageEvent = e;
      this.memberParams.pageSize = e.pageSize;
      this.memberParams.pageNumber = e.pageIndex + 1;

      this.showAnswerQuestion();
    }
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}