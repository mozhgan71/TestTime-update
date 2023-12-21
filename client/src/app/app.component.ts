import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { AccountService } from './services/account.service';
import { AppUser } from './models/app-user.model';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MainComponent } from "./components/main/main.component";

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
      console.log('PlatformId in method:', this.platformId);
      userString = localStorage.getItem('user');
    }

    if (userString) {
      const user: AppUser = JSON.parse(userString); // convert string to JSON before sending to method

      this.accountService.setCurrentUser(user);
    }
  }
}