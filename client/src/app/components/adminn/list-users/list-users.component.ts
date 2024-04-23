import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppUser } from '../../../models/app-user.model';
import { MatIconModule } from '@angular/material/icon';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member-model';
import { environment } from '../../../../environments/environment.development';
import { MemberCardComponent } from '../member-card/member-card.component';
import { MemberParams } from '../../../models/helpers/member-params';
import { PaginatedResult } from '../../../models/helpers/paginatedResult';
import { Pagination } from '../../../models/helpers/pagination';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  standalone: true,
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  imports: [CommonModule, MatIconModule, NgOptimizedImage,
    MemberCardComponent, MatPaginatorModule]
})
export class ListUsersComponent implements OnInit, OnDestroy {
  private readonly baseApiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  memberService = inject(MemberService);

  subscribed: Subscription | undefined;

  users: Member[] | null | undefined;
  delUser: AppUser | undefined;
  allMembers$: Observable<Member[] | null> | undefined;
  // allMembersSig = signal<Member[] | null>(null);
  // subscription: Subscription | undefined;         //zamani ke bekhaym error haro begirim az api az in ravesh mirim

  pagination: Pagination | undefined;
  members: Member[] | undefined;
  memberParams: MemberParams | undefined;

  pageSizeOptions = [5, 10, 15, 20, 25];
  pageEvent: PageEvent | undefined;

  apiPhotoUrl = environment.apiPhotoUrl;

  ngOnInit(): void {
    this.memberParams = new MemberParams();

    this.getAll();
  }

  ngOnDestroy(): void {
    this.subscribed?.unsubscribe();
  }

  getAll(): void {
    if (this.memberParams)
      this.subscribed = this.memberService.getAllMembers(this.memberParams).subscribe(
        {
          next: (response: PaginatedResult<Member[]>) => {
            if (response.body && response.pagination) {
              this.members = response.body;
              console.log("MEMBERS:",this.members);
              this.pagination = response.pagination;
              console.log("PAGINATION:",this.pagination);
            }
          }
        }
      );
  }

  // this.allMembers$ = this.memberService.getAllMembers();
  // this.allMembersSig.set(this.users!);

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

  deleteUser(i: number, id: string): void {
    this.http.delete<AppUser>(this.baseApiUrl + 'user/delete/' + id).subscribe(
      {
        next: response => {
          this.delUser = response
          console.log(response);
          // alert("عملیات حذف کاربر با موفقیت انجام شد.");
          this.members!.splice(i, 1);
        }
      }
    );
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}