import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';
import { AppUser } from '../../models/app-user.model';
import { AccountService } from '../../services/account.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone:true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports:[RouterModule,CommonModule,MatSidenavModule,
    MatToolbarModule,MatIconModule, MatListModule]
})
export class HeaderComponent {
  user: AppUser | null | undefined;
  user$: Observable<AppUser | null> | undefined;

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // this.accountService.currentUser$.subscribe({
    //   next: (response) => this.user = response

      this.user$ = this.accountService.currentUser$;
  }

  logOut(): void {       //with service
    this.accountService.logOut();

    this.user = null;

    this.router.navigateByUrl('home');
  }

  checkUserLogIn(): void {     //for user profile with service
    const logedIn = localStorage.getItem('user');

    if (logedIn) {
      this.router.navigateByUrl('/user-profile');
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  checkLogIn(): void {         //for test category with service
    const logedIn = localStorage.getItem('user');

    if (logedIn) {
      this.router.navigateByUrl('/test-category');
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  checkAdminLogIn(): void {     //for admin with session
    var adminLogedIn = sessionStorage.getItem('logedin');

    if (adminLogedIn == "true") {
      this.router.navigateByUrl('/admin-profile');
    }
    else {
      this.router.navigateByUrl('/admin-login');
    }
  }
}