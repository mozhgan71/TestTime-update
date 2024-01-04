import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { AccountService } from './services/account.service';
import { AppUser } from './models/app-user.model';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MainComponent } from "./components/main/main.component";
import { LoggedInUser } from './models/logged-in-user.model';
import { take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, HeaderComponent, FooterComponent, MainComponent]
})
export class AppComponent implements OnInit {
  accountService = inject(AccountService);
  platformId = inject(PLATFORM_ID); // used to test if we are in the client(browser) or server. We must be on the client to access localStorage!

  allUsers: AppUser[] | undefined

  ngOnInit(): void {
    console.log('PlatformId in OnInit:', this.platformId);
    this.getLocalStorageCurrentValues();
  }

  getLocalStorageCurrentValues(): void {
    let userString: string | null = null;

    // if (isPlatformServer(this.platformId))
    if (isPlatformBrowser(this.platformId)) { // this code is ran on the browser now
      const tokenValue = localStorage.getItem('token');

      if (tokenValue) { // do NOT call api if no token is in the localStorage!! Performance!
        this.accountService.getLoggedInUser().pipe(take(1)).subscribe(
          {
            next: (loggedInUser: LoggedInUser | null) => {
              if (loggedInUser)
                this.accountService.setCurrentUser(loggedInUser);
            },
            error: () => this.accountService.logOut()
            // error: (err) => {
            //   console.log(err.error);
            //   this.accountService.logoutUser()
            // } //if token is expired and api call is unauthorized.
          });
      }
    }

    if (userString) {
      const user: AppUser = JSON.parse(userString); // convert string to JSON before sending to method

      this.accountService.setCurrentUser(user);
    }
  }
}