import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Maquette } from '../types';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MaquetteService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Maquette[]> {
    return this.http.get<Maquette[]>('/maquette');
  }
}
