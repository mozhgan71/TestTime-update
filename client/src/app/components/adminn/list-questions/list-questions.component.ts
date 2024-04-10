import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Question } from '../../../models/question.model';
import { environment } from '../../../../environments/environment.development';

@Component({
  standalone: true,
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss'],
  imports: [CommonModule, MatIconModule]
})
export class ListQuestionsComponent {
  private readonly baseApiUrl = environment.apiUrl;
  
  private http = inject(HttpClient);

  questions: Question[] | undefined;
  delQuestion: Question | undefined;

  constructor() {
    this.showQuestion();
  }

  showQuestion(): void {
    this.http.get<Question[]>(this.baseApiUrl + 'question/').subscribe(
      { next: response => this.questions = response }
    );
  }

  deleteQuestion(id: string): void {
    this.http.delete<Question>(this.baseApiUrl + 'question/delete/' + id).subscribe(
      {
        next: response => {
          this.delQuestion = response
          console.log(response);
          alert("عملیات حذف سوال با موفقیت انجام شد.");
        }
      }
    );
  }

  getQuestionId(id: string): void {
    sessionStorage.setItem('id-question', id);
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}