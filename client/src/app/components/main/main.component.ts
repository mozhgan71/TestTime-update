import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private router: Router) {
    this.createSlider();
  }

  createSlider() {
    var i = 0;
    setInterval(function () {
      document.getElementById('mySlide')?.setAttribute('src', 'assets/images/' + i + '.jpg');
      i = (i + 1) % 14;
    }, 3000);
  }

  checkLogIn(): void { //for test category
    const logedIn = localStorage.getItem('user');

    if (logedIn) {
      this.router.navigateByUrl('/test-category');
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }
}