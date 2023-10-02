import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  resultRes: Result[] | undefined;
  delResult: Result | undefined;

  chart2: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.showResult();
  }

  showResult() {
    var userId = sessionStorage.getItem('user-id');

    this.http.get<Result[]>('http://localhost:5000/api/result/get-by-user-id/' + userId).subscribe(
      {
        next: res => {
          this.resultRes = res;
          console.log(res);
        },
      }
    );
  }

  deleteResult(id: string): void {
    this.http.delete<Result>('http://localhost:5000/api/result/delete/' + id).subscribe(
      {
        next: response => {
          this.delResult = response
          console.log(response);
          alert("عملیات حذف سوال با موفقیت انجام شد.");
        }
      }
    );
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}