import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { Result } from '../../../../models/result.model';
import { environment } from '../../../../../environments/environment.development';

@Component({
  standalone:true,
  selector: 'app-compare-in-sqlserver',
  templateUrl: './compare-in-sqlserver.component.html',
  styleUrls: ['./compare-in-sqlserver.component.scss']
})
export class CompareInSqlServerComponent {
  private readonly baseApiUrl = environment.apiUrl;
  
  private http = inject(HttpClient);
  
  sqlServerResults: Result[] = [];

  sum: number = 0

  chart2: any;
  yourScore: number = 0;
  averageOfUsers: number = 0;

  constructor() {
    this.showSqlServerResult();
  }

  showSqlServerResult(): void {
    var userId = sessionStorage.getItem('user-id');

    this.http.get<Result[]>(this.baseApiUrl + 'result/get-by-test-name/sqlserver').subscribe(
      {
        next: response => {
          this.sqlServerResults = response
          this.sqlServerResults.forEach(result => {
            this.sum = this.sum + result.numberOfCorrect;
            if (result.userId == userId) {
              this.yourScore = result.numberOfCorrect;
            }
          });

          this.averageOfUsers = this.sum / (this.sqlServerResults.length);

          console.log(this.averageOfUsers);
          console.log(this.yourScore);

          this.chart2 = new Chart("MyChart2",
            {
              type: 'pie', //this denotes tha type of chart

              data: {// values on X-Axis
                labels: ['شما SqlServer نمره ', 'کاربران SqlServer میانگین نمرات ',],
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