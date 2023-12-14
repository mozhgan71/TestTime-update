import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss']
})
export class AdminProfileComponent {
  private router = inject(Router);

  adminLogOut(): void {
    sessionStorage.setItem('logedin', "false");
    this.router.navigateByUrl('/home');
  }
}