import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Result } from 'src/app/models/result.model';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-compare-in-angular',
  templateUrl: './compare-in-angular.component.html',
  styleUrls: ['./compare-in-angular.component.scss']
})
export class CompareInAngularComponent {
  angularResults: Result[] = [];

  sum: number = 0

  chart2: any;
  yourScore: number = 0;
  averageOfUsers: number = 0;

  constructor(private http: HttpClient) {
    this.showAngularResult();
  }

  showAngularResult(): void {
    var userId = sessionStorage.getItem('user-id');

    this.http.get<Result[]>('https://localhost:5001/api/result/get-by-test-name/ANGULAR').subscribe(
      {
        next: response => {
          this.angularResults = response
          this.angularResults.forEach(result => {
            this.sum = this.sum + result.numberOfCorrect;
            if (result.userId == userId) {
              this.yourScore = result.numberOfCorrect;
            }
          });

          this.averageOfUsers = this.sum / (this.angularResults.length);

          console.log(this.averageOfUsers);
          console.log(this.yourScore);

          this.chart2 = new Chart("MyChart2",
            {
              type: 'pie', //this denotes tha type of chart

              data: {// values on X-Axis
                labels: ['شما Angular نمره ', 'کاربران Angular میانگین نمرات  ',],
                datasets: [{
                  label: 'نمره',
                  data: [this.yourScore, this.averageOfUsers],
                  backgroundColor: [
                    'purple',
                    'pink',
                  ],
                  hoverOffset: 10
                }],
              },
              options: {
                responsive: true,
                aspectRatio: 3.5
              }
            });
        }
      },
    );
  }
}