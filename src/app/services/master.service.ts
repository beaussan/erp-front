import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Master } from '../types';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Master[]> {
    return this.http.get<Master[]>('/master');
  }

  deleteById(id: string): Observable<any> {
    return this.http.delete(`/master/${id}`);
  }
}
