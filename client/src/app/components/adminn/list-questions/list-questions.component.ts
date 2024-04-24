import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Question } from '../../../models/question.model';
import { environment } from '../../../../environments/environment.development';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../../models/helpers/pagination';
import { MemberParams } from '../../../models/helpers/member-params';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { PaginatedResult } from '../../../models/helpers/paginatedResult';

@Component({
  standalone: true,
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss'],
  imports: [CommonModule, RouterModule, MatIconModule, MatPaginatorModule]
})
export class ListQuestionsComponent implements OnInit, OnDestroy {
  adminService = inject(AdminService);
  private readonly baseApiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  questions: Question[] | undefined;
  delQuestion: Question | undefined;

  subscribed: Subscription | undefined;
  pageSizeOptions = [5, 10, 15, 20];
  pageEvent: PageEvent | undefined;
  pagination: Pagination | undefined;
  memberParams: MemberParams | undefined;

  ngOnInit(): void {
    this.memberParams = new MemberParams();

    this.getAll();
    // this.showQuestion();
  }

  ngOnDestroy(): void {
    this.subscribed?.unsubscribe();
  }

  getAll(): void {
    if (this.memberParams)
      this.subscribed = this.adminService.getAllQuestions(this.memberParams).subscribe({
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
  // showQuestion(): void {
  //   this.http.get<Question[]>(this.baseApiUrl + 'question/').subscribe(
  //     { next: response => this.questions = response }
  //   );
  // }

  deleteQuestion(i: number, id: string): void {
    this.http.delete<Question>(this.baseApiUrl + 'question/delete/' + id).subscribe(
      {
        next: response => {
          this.delQuestion = response
          console.log(response);
          alert("عملیات حذف سوال با موفقیت انجام شد.");
          this.questions!.splice(i, 1);
        }
      }
    );
  }

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

  getQuestionId(id: string): void {
    sessionStorage.setItem('id-question', id);
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}