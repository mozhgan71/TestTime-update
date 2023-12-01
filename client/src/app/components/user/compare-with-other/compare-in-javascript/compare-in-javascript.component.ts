import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { Result } from '../../../../models/result.model';

@Component({
  standalone:true,
  selector: 'app-compare-in-javascript',
  templateUrl: './compare-in-javascript.component.html',
  styleUrls: ['./compare-in-javascript.component.scss']
})
export class CompareInJavaScriptComponent {
  javaScriptResults: Result[] = [];

  sum: number = 0

  chart2: any;
  yourScore: number = 0;
  averageOfUsers: number = 0;

  constructor(private http: HttpClient) {
    this.showJavaScriptResult();
  }

  showJavaScriptResult(): void {
    var userId = sessionStorage.getItem('user-id');

    this.http.get<Result[]>('http://localhost:5000/api/result/get-by-test-name/javascript').subscribe(
      {
        next: response => {
          this.javaScriptResults = response
          this.javaScriptResults.forEach(result => {
            this.sum = this.sum + result.numberOfCorrect;
            if (result.userId == userId) {
              this.yourScore = result.numberOfCorrect;
            }
          });

          this.averageOfUsers = this.sum / (this.javaScriptResults.length);

          console.log(this.averageOfUsers);
          console.log(this.yourScore);

          this.chart2 = new Chart("MyChart2",
            {
              type: 'pie', //this denotes tha type of chart

              data: {// values on X-Axis
                labels: ['شما javascript نمره ', 'کاربران javascript میانگین نمرات ',],
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