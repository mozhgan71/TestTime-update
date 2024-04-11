import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ApiException } from '../../../models/api-exception.model';
import { response } from 'express';

@Component({
  selector: 'app-list-apiexceptions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-apiexceptions.component.html',
  styleUrl: './list-apiexceptions.component.scss'
})
export class ListApiexceptionsComponent implements OnInit {
  private readonly baseApiUrl = environment.apiUrl

  private http = inject(HttpClient);

  apiExceptions: ApiException[] | undefined;

  ngOnInit(): void {
    this.showApiException();
  }

  showApiException(): void {
    this.http.get<ApiException[]>(this.baseApiUrl + 'apiexception').subscribe(
      { next: response => this.apiExceptions = response }
    );
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
