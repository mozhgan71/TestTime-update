import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Member } from '../../../models/member-model';
import { LoggedInUser } from '../../../models/logged-in-user.model';
import { environment } from '../../../../environments/environment.development';
import { AppUser } from '../../../models/app-user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage,
    MatCardModule, MatIconModule
  ],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
  private readonly baseApiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  @Input('memberInput') member: Member | undefined;
  // @Input('isAliveInput') isAlive: boolean | undefined;
  @Input('loggedIn') loggedIn: LoggedInUser | undefined;

  // apiPhotoUrl = environment.apiPhotoUrl;

  apiPhotoUrl = environment.apiPhotoUrl;

  delUser: AppUser | undefined;

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  deleteUser(id: string): void {
    this.http.delete<AppUser>(this.baseApiUrl + 'user/delete/' + id).subscribe(
      {
        next: response => {
          this.delUser = response
          console.log(response);
        }
      }
    );
  }
}
