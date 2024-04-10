import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { Result } from '../../../../models/result.model';
import { environment } from '../../../../../environments/environment.development';

@Component({
  standalone:true,
  selector: 'app-compare-in-react',
  templateUrl: './compare-in-react.component.html',
  styleUrls: ['./compare-in-react.component.scss']
})
export class CompareInReactComponent {
  private readonly baseApiUrl = environment.apiUrl;
  
  private http = inject(HttpClient);
  
  reactResults: Result[] = [];

  sum: number = 0

  chart2: any;
  yourScore: number = 0;
  averageOfUsers: number = 0;

  constructor() {
    this.showReactResult();
  }

  showReactResult(): void {
    var userId = sessionStorage.getItem('user-id');

    this.http.get<Result[]>(this.baseApiUrl + 'result/get-by-test-name/react').subscribe(
      {
        next: response => {
          this.reactResults = response
          this.reactResults.forEach(result => {
            this.sum = this.sum + result.numberOfCorrect;
            if (result.userId == userId) {
              this.yourScore = result.numberOfCorrect;
            }
          });

          this.averageOfUsers = this.sum / (this.reactResults.length);

          console.log(this.averageOfUsers);
          console.log(this.yourScore);

          this.chart2 = new Chart("MyChart2",
            {
              type: 'pie', //this denotes tha type of chart

              data: {// values on X-Axis
                labels: ['شما React نمره', 'کاربران React میانگین نمرات ',],
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