import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Suggestion } from 'src/app/models/suggestion.model';

@Component({
  selector: 'app-list-suggestions',
  templateUrl: './list-suggestions.component.html',
  styleUrls: ['./list-suggestions.component.scss']
})
export class ListSuggestionsComponent {
  suggestions: Suggestion[] | undefined;

  constructor(private http: HttpClient) {
    this.showSuggestion();
  }

  showSuggestion(): void {
    this.http.get<Suggestion[]>('https://localhost:5001/api/suggestion/').subscribe(
      { next: response => this.suggestions = response }
    );
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}