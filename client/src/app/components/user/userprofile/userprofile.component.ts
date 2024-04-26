import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppUser } from '../../../models/app-user.model';
import { AccountService } from '../../../services/account.service';
import { UserService } from '../../../services/user.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MemberService } from '../../../services/member.service';
import { LoggedInUser } from '../../../models/logged-in-user.model';
import { environment } from '../../../../environments/environment.development';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
  imports: [CommonModule, RouterModule, NgOptimizedImage,
    MatIconModule]
})
export class UserProfileComponent implements OnInit {
  // @Input('userInput') user: LoggedInUser | null | undefined;

  private router = inject(Router);
  private accountService = inject(AccountService);
  private memberService = inject(MemberService);

  photoUrl: string = environment.apiPhotoUrl;

  userRes: AppUser | null | undefined;
  // loginUser: LoggedInUser | null | undefined;

  loggedInUserSig: Signal<LoggedInUser | null> | undefined;

  constructor() {
    this.showInfo();
  }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(
      (response: any) => {
        this.userRes = response
        console.log(this.userRes);
      }
    );

    this.loggedInUserSig = this.accountService.loggedInUserSig;
  }

  logOut(): void {       //with service
    this.accountService.logOut();

    this.userRes = null;

    this.router.navigateByUrl('home');
  }

  showInfo(): void { //moshakhasate karbar ra az db namayesh dadam ke ba edit kardan taghirat emal shavad
    var userId = sessionStorage.getItem('user-id');

    this.memberService.getMemberById(userId).subscribe(
      {
        next: res => {
          this.userRes = res;
          // console.log(res);
        },
      }
    );
  }

  // logOut(): void { //with session
  //   sessionStorage.setItem('invalid-login', "true");
  //   this.router.navigateByUrl('/home');
  // }
}