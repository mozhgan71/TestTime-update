import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Suggestion } from '../../../models/suggestion.model';

@Component({
  standalone: true,
  selector: 'app-list-suggestions',
  templateUrl: './list-suggestions.component.html',
  styleUrls: ['./list-suggestions.component.scss'],
  imports: [CommonModule]
})
export class ListSuggestionsComponent {
  private http = inject(HttpClient);

  suggestions: Suggestion[] | undefined;

  constructor() {
    this.showSuggestion();
  }

  showSuggestion(): void {
    this.http.get<Suggestion[]>('http://localhost:5000/api/suggestion/').subscribe(
      { next: response => this.suggestions = response }
    );
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}