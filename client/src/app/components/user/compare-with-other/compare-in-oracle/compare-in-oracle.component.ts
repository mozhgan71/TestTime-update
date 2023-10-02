import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-compare-in-oracle',
  templateUrl: './compare-in-oracle.component.html',
  styleUrls: ['./compare-in-oracle.component.scss']
})
export class CompareInOracleComponent {
  oracleResults: Result[] = [];

  sum: number = 0

  chart2: any;
  yourScore: number = 0;
  averageOfUsers: number = 0;

  constructor(private http: HttpClient) {
    this.showOracleResult();
  }

  showOracleResult(): void {
    var userId = sessionStorage.getItem('user-id');

    this.http.get<Result[]>('http://localhost:5000/api/result/get-by-test-name/oracle').subscribe(
      {
        next: response => {
          this.oracleResults = response
          this.oracleResults.forEach(result => {
            this.sum = this.sum + result.numberOfCorrect;
            if (result.userId == userId) {
              this.yourScore = result.numberOfCorrect;
            }
          });

          this.averageOfUsers = this.sum / (this.oracleResults.length);

          console.log(this.averageOfUsers);
          console.log(this.yourScore);

          this.chart2 = new Chart("MyChart2",
            {
              type: 'pie', //this denotes tha type of chart

              data: {// values on X-Axis
                labels: ['شما Oracle نمره ', 'کاربران Oracle میانگین نمرات ',],
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