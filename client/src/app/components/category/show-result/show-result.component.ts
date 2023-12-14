import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';import { Result } from '../../../models/result.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.scss'],
  imports:[CommonModule]
})
export class ShowResultComponent {
  private http = inject(HttpClient);

  resultRes: Result | undefined;

  constructor() {
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