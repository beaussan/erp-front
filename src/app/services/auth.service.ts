import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  loginUser(email, password): Observable<string> {
    return this.http
      .post<{ token: string }>('/auth/login', { email, password })
      .pipe(map(val => val.token));
  }

  fetchUser(): Observable<User> {
    return this.http.get('/auth/me').pipe(map(User.fromJs));
  }
}
