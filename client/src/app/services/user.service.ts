import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppUser } from '../models/app-user.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

}