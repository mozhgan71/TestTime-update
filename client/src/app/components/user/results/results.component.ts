import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Result } from '../../../models/result.model';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  imports: [CommonModule, MatIconModule, RouterModule]
})
export class ResultsComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  resultRes: Result[] | undefined;
  delResult: Result | undefined;

  chart2: any;

  constructor() {
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