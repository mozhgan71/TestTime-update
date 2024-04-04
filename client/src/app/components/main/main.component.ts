import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [RouterModule,CommonModule,NgOptimizedImage, MatButtonModule,]
})
export class MainComponent {
  private router = inject(Router);

  constructor() {
    //this.createSlider();
  }

  // ngOnInit(): void {
  //  this.createSlider();
  // }

  createSlider() {
    var i = 0;
    setInterval(function () {
      document.getElementById('mySlide')?.setAttribute('src', 'assets/images/' + i + '.jpg');
      i = (i + 1) % 14;
    }, 3000);
  }

  checkLogIn(): void { //for test category
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigateByUrl('/test-category');
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }
}