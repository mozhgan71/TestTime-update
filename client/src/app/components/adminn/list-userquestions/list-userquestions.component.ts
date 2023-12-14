import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Question } from '../../../models/question.model';

@Component({
  standalone: true,
  selector: 'app-list-userquestions',
  templateUrl: './list-userquestions.component.html',
  styleUrls: ['./list-userquestions.component.scss'],
  imports: [CommonModule]
})
export class ListUserQuestionsComponent {
  private http = inject(HttpClient);

  userquestions: Question[] | undefined;

  constructor() {
    this.showUserQuestion();
  }

  showUserQuestion(): void {
    this.http.get<Question[]>('https://localhost:5001/api/userquestion/').subscribe(
      { next: response => this.userquestions = response }
    );
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}