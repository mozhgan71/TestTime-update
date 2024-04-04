import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss'],
  imports: [RouterModule,MatButtonModule]
})
export class AdminProfileComponent {
  private router = inject(Router);

  adminLogOut(): void {
    sessionStorage.setItem('logedin', "false");
    this.router.navigateByUrl('/home');
  }
}