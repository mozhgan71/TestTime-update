import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports:[RouterModule]
})
export class MainComponent {
  private router = inject(Router);
  
  constructor() {
    //this.createSlider();
  }

  createSlider() {
    var i = 0;
    setInterval(function () {
      document.getElementById('mySlide')?.setAttribute('src', 'assets/images/' + i + '.jpg');
      i = (i + 1) % 14;
    }, 3000);
  }

  checkLogIn(): void { //for test category
    const logedIn = sessionStorage.getItem('user');

    if (logedIn) {
      this.router.navigateByUrl('/test-category');
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }
}