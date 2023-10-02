import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-list-userquestions',
  templateUrl: './list-userquestions.component.html',
  styleUrls: ['./list-userquestions.component.scss']
})
export class ListUserQuestionsComponent {
  userquestions: Question[] | undefined;

  constructor(private http: HttpClient) {
    this.showUserQuestion();
  }

  showUserQuestion(): void {
    this.http.get<Question[]>('http://localhost:5000/api/userquestion/').subscribe(
      { next: response => this.userquestions = response }
    );
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}