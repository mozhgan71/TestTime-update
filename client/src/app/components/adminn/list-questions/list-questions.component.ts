import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss']
})
export class ListQuestionsComponent {
  questions: Question[] | undefined;
  delQuestion: Question | undefined;

  constructor(private http: HttpClient, private router: Router) {
    this.showQuestion();
  }

  showQuestion(): void {
    this.http.get<Question[]>('https://localhost:5001/api/question/').subscribe(
      { next: response => this.questions = response }
    );
  }

  deleteQuestion(id: string): void {
    this.http.delete<Question>('https://localhost:5001/api/question/delete/' + id).subscribe(
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