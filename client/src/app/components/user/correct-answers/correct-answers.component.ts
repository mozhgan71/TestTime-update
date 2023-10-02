import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-correct-answers',
  templateUrl: './correct-answers.component.html',
  styleUrls: ['./correct-answers.component.scss']
})
export class CorrectAnswersComponent {
  questions: Question[] | undefined;

  constructor(private http: HttpClient) {
    this.showAnswerQuestion();
  }

  showAnswerQuestion(): void {
    this.http.get<Question[]>('http://localhost:5000/api/question/').subscribe(
      { next: response => this.questions = response }
    );
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}