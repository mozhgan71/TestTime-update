import { Component, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppUser } from '../../../models/app-user.model';
import { UserService } from '../../../services/user.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  imports: [CommonModule, MatIconModule]
})
export class ListUsersComponent {
  private http = inject(HttpClient);
  private _userService = inject(UserService);

  users: AppUser[] | null | undefined;
  delUser: AppUser | undefined;
  allUsers$: Observable<AppUser[] | null> | undefined;
  // subscription: Subscription | undefined;         //zamani ke bekhaym error haro begirim az api az in ravesh mirim

  constructor() {
    this.showUsers();
  }

  // ngOnDestroy(): void {                       //zamani ke bekhaym error haro begirim az api az in ravesh mirim
  //   this.subscription?.unsubscribe();

  //   console.log('Unsubscribe Done');
  // }

  showUsers(): void {
    this._userService.getAllUsers().subscribe(
      {
        next: (users: AppUser[] | null) => this.users = users,
        error: (err: any) => console.log(err.message),
      }
    );

    this.allUsers$ = this._userService.getAllUsers();
  }

  deleteUser(id: string): void {
    this.http.delete<AppUser>('https://localhost:5001/api/user/delete/' + id).subscribe(
      {
        next: response => {
          this.delUser = response
          console.log(response);
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