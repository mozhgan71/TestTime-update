import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss']
})
export class AdminProfileComponent {

  constructor(private router: Router) { }

  adminLogOut(): void {
    sessionStorage.setItem('logedin', "false");
    this.router.navigateByUrl('/home');
  }
}