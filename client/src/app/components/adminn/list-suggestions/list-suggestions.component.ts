import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Suggestion } from '../../../models/suggestion.model';
import { environment } from '../../../../environments/environment.development';

@Component({
  standalone: true,
  selector: 'app-list-suggestions',
  templateUrl: './list-suggestions.component.html',
  styleUrls: ['./list-suggestions.component.scss'],
  imports: [CommonModule]
})
export class ListSuggestionsComponent {
  private readonly baseApiUrl = environment.apiUrl;
  
  private http = inject(HttpClient);

  suggestions: Suggestion[] | undefined;

  constructor() {
    this.showSuggestion();
  }

  showSuggestion(): void {
    this.http.get<Suggestion[]>(this.baseApiUrl + 'suggestion/').subscribe(
      { next: response => this.suggestions = response }
    );
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}