import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { AppUser } from './models/app-user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private userService: AccountService) { }

  ngOnInit(): void {
    const userString = localStorage.getItem('user'); // get admin from broswer's localStorage

    if (userString) {
      const user: AppUser = JSON.parse(userString);

      this.userService.setCurrentUser(user);
    }
  }
}