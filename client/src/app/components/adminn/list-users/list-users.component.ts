import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from 'src/app/models/app-user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  users: AppUser[] | undefined;
  delUser: AppUser | undefined;

  constructor(private http: HttpClient, private router: Router) {
    this.showUsers();
  }

  showUsers(): void {
    this.http.get<AppUser[]>('https://localhost:5001/api/user').subscribe(
      {
        next: response => this.users = response
      }
    );
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