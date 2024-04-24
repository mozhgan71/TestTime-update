import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Suggestion } from '../../../models/suggestion.model';
import { environment } from '../../../../environments/environment.development';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AdminService } from '../../../services/admin.service';
import { MemberParams } from '../../../models/helpers/member-params';
import { Subscription } from 'rxjs';
import { Pagination } from '../../../models/helpers/pagination';
import { PaginatedResult } from '../../../models/helpers/paginatedResult';

@Component({
  standalone: true,
  selector: 'app-list-suggestions',
  templateUrl: './list-suggestions.component.html',
  styleUrls: ['./list-suggestions.component.scss'],
  imports: [CommonModule, MatPaginatorModule]
})
export class ListSuggestionsComponent implements OnInit, OnDestroy {
  adminService = inject(AdminService);
  private readonly baseApiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  suggestions: Suggestion[] | undefined;

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
      this.subscribed = this.adminService.getAllSuggestion(this.memberParams).subscribe({
        next: (response: PaginatedResult<Suggestion[]>) => {
          if (response.body && response.pagination) {
            this.suggestions = response.body;
            console.log("SUGGESTIONS:", this.suggestions);
            this.pagination = response.pagination;
            console.log("PAGINATION:", this.pagination);
          }
        }
      });
  }

  // showAllSuggestion(): void {
  //   this.http.get<Suggestion[]>(this.baseApiUrl + 'suggestion/').subscribe(
  //     { next: response => this.suggestions = response }
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