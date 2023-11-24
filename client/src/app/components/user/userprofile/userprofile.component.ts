import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/app-user.model';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserProfileComponent {
  userRes: AppUser | null | undefined;

  constructor(private router: Router, private accountService: AccountService, private http: HttpClient, private userService: UserService) {
    accountService.currentUser$.subscribe(
      response => this.userRes = response
    );

    this.showInfo();
  }

  logOut(): void {       //with service
    this.accountService.logOut();

    this.userRes = null;

    this.router.navigateByUrl('home');
  }

  showInfo(): void { //moshakhasate karbar ra az db namayesh dadam ke ba edit kardan taghirat emal shavad
    var userId = sessionStorage.getItem('user-id');

    this.userService.getUserById(userId).subscribe(
      {
        next: res => {
          this.userRes = res;
          console.log(res);
        },
      }
    );
  }

  // logOut(): void { //with session
  //   sessionStorage.setItem('invalid-login', "true");
  //   this.router.navigateByUrl('/home');
  // }
}