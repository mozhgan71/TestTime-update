import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Result } from '../../../models/result.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  standalone: true,
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.scss'],
  imports: [RouterModule, CommonModule, RouterModule]
})
export class ShowResultComponent {
  private readonly baseApiUrl = environment.apiUrl;
  
  private http = inject(HttpClient);

  resultRes: Result | undefined;

  constructor() {
    this.showResult();
  }

  showResult(): void {
    var resultId = sessionStorage.getItem('result-id');

    this.http.get<Result>(this.baseApiUrl + 'result/get-by-id/' + resultId).subscribe(
      {
        next: response => {
          this.resultRes = response
          console.log(response);
        }
      }
    );
  }
}