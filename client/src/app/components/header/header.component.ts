import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

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