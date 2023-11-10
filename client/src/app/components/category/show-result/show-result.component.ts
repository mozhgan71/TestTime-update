import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.scss']
})
export class ShowResultComponent {
  resultRes: Result | undefined;

  constructor(private http: HttpClient) {
    this.showResult();
  }

  showResult(): void {
    var resultId = sessionStorage.getItem('result-id');

    this.http.get<Result>('https://localhost:5001/api/result/get-by-id/' + resultId).subscribe(
      {
        next: response => {
          this.resultRes = response
          console.log(response);
        }
      }
    );
  }
}