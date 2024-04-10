import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { Result } from '../../../../models/result.model';
import { environment } from '../../../../../environments/environment.development';

@Component({
  standalone:true,
  selector: 'app-compare-in-cplus',
  templateUrl: './compare-in-cplus.component.html',
  styleUrls: ['./compare-in-cplus.component.scss']
})
export class CompareInCplusComponent {
  private readonly baseApiUrl = environment.apiUrl;
  
  private http = inject(HttpClient);

  cPlusResults: Result[] = [];

  sum: number = 0

  chart2: any;
  yourScore: number = 0;
  averageOfUsers: number = 0;

  constructor() {
    this.showCplusResult();
  }

  showCplusResult(): void {
    var userId = sessionStorage.getItem('user-id');

    this.http.get<Result[]>(this.baseApiUrl + 'result/get-by-test-name/c++').subscribe(
      {
        next: response => {
          this.cPlusResults = response
          this.cPlusResults.forEach(result => {
            this.sum = this.sum + result.numberOfCorrect;
            if (result.userId == userId) {
              this.yourScore = result.numberOfCorrect;
            }
          });

          this.averageOfUsers = this.sum / (this.cPlusResults.length);

          console.log(this.averageOfUsers);
          console.log(this.yourScore);

          this.chart2 = new Chart("MyChart2",
            {
              type: 'pie', //this denotes tha type of chart

              data: {// values on X-Axis
                labels: ['شما c++ نمره ', 'کاربران c++ میانگین نمرات ',],
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