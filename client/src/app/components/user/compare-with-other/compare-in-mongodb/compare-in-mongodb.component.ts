import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-compare-in-mongodb',
  templateUrl: './compare-in-mongodb.component.html',
  styleUrls: ['./compare-in-mongodb.component.scss']
})
export class CompareInMongodbComponent {
  mongoDBResults: Result[] = [];

  sum: number = 0

  chart2: any;
  yourScore: number = 0;
  averageOfUsers: number = 0;

  constructor(private http: HttpClient) {
    this.showMongoDBResult();
  }

  showMongoDBResult(): void {
    var userId = sessionStorage.getItem('user-id');

    this.http.get<Result[]>('http://localhost:5000/api/result/get-by-test-name/mongodb').subscribe(
      {
        next: response => {
          this.mongoDBResults = response
          this.mongoDBResults.forEach(result => {
            this.sum = this.sum + result.numberOfCorrect;
            if (result.userId == userId) {
              this.yourScore = result.numberOfCorrect;
            }
          });

          this.averageOfUsers = this.sum / (this.mongoDBResults.length);

          console.log(this.averageOfUsers);
          console.log(this.yourScore);

          this.chart2 = new Chart("MyChart2",
            {
              type: 'pie', //this denotes tha type of chart

              data: {// values on X-Axis
                labels: ['شما MongoDB نمره ', 'کاربران MongoDB میانگین نمرات ',],
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