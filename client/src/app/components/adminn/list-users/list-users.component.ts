import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from 'src/app/models/app-user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  users: AppUser[] | null | undefined;
  delUser: AppUser | undefined;
  allUsers$: Observable<AppUser[] | null> | undefined;
  // subscription: Subscription | undefined;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    this.showUsers();
  }

  // ngOnDestroy(): void {
  //   this.subscription?.unsubscribe();

  //   console.log('Unsubscribe Done');
  // }

  showUsers(): void {
    this.userService.getAllUsers().subscribe(
      {
        next: (users: AppUser[] | null) => this.users = users,
        error: (err: any) => console.log(err.message),
      }
    );

    this.allUsers$ = this.userService.getAllUsers();
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