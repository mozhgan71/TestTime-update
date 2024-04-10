import { Component, OnDestroy, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppUser } from '../../../models/app-user.model';
import { UserService } from '../../../services/user.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member-model';
import { environment } from '../../../../environments/environment.development';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  standalone: true,
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  imports: [CommonModule, MatIconModule, NgOptimizedImage, MemberCardComponent]
})
export class ListUsersComponent {
  private readonly baseApiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private _memberService = inject(MemberService);

  users: Member[] | null | undefined;
  delUser: AppUser | undefined;
  allMembers$: Observable<Member[] | null> | undefined;
  allMembersSig = signal<Member[] | null>(null);
  // subscription: Subscription | undefined;         //zamani ke bekhaym error haro begirim az api az in ravesh mirim

  apiPhotoUrl = environment.apiPhotoUrl;

  constructor() {
    this.showUsers();
  }

  // ngOnDestroy(): void {                       //zamani ke bekhaym error haro begirim az api az in ravesh mirim
  //   this.subscription?.unsubscribe();

  //   console.log('Unsubscribe Done');
  // }

  showUsers(): void {
    this._memberService.getAllMembers().subscribe(
      {
        next: (users: Member[] | null) => this.users = users,
        error: (err: any) => console.log(err.message),
      }
    );

    this.allMembers$ = this._memberService.getAllMembers();
    this.allMembersSig.set(this.users!);
  }

  deleteUser(id: string): void {
    this.http.delete<AppUser>(this.baseApiUrl + 'user/delete/' + id).subscribe(
      {
        next: response => {
          this.delUser = response
          console.log(response);
          this.showUsers();
          alert("عملیات حذف کاربر با موفقیت انجام شد.");
        }
      }
    );
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}