import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Question } from '../../../models/question.model';
import { environment } from '../../../../environments/environment.development';

@Component({
  standalone:true,
  selector: 'app-correct-answers',
  templateUrl: './correct-answers.component.html',
  styleUrls: ['./correct-answers.component.scss'],
  imports:[CommonModule]
})
export class CorrectAnswersComponent {
  private readonly baseApiUrl = environment.apiUrl;
  
  private http = inject(HttpClient);
  
  questions: Question[] | undefined;

  constructor() {
    this.showAnswerQuestion();
  }

  showAnswerQuestion(): void {
    this.http.get<Question[]>(this.baseApiUrl + 'question/').subscribe(
      { next: response => this.questions = response }
    );
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}