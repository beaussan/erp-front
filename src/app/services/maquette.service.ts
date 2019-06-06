import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Maquette } from '../types';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { debug } from 'util';

@Injectable({
  providedIn: 'root',
})
export class MaquetteService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Maquette[]> {
    return this.http.get<Maquette[]>('/maquette');
  }

  deleteById(id: string): Observable<any> {
    return this.http.delete(`/maquette/${id}`);
  }

  lock(id: string): Observable<Maquette> {
    return this.http.post<Maquette>(`/maquette/${id}/lock`, {});
  }

  unlock(id: string): Observable<Maquette> {
    return this.http.post<Maquette>(`/maquette/${id}/unlock`, {});
  }

  save(id: string, data: Maquette): Observable<Maquette> {
    let out = { ...data } as any;
    out.master = data.master.id;
    out = JSON.parse(JSON.stringify(out));
    removeProps(out, ['_id', 'id']);
    return this.http.put<Maquette>(`/maquette/${id}`, out);
  }
  saveNew(data: Maquette): Observable<Maquette> {
    let out = { ...data } as any;
    out.master = data.master.id;
    out = JSON.parse(JSON.stringify(out));
    removeProps(out, ['_id', 'id']);
    return this.http.post<Maquette>(`/maquette/`, out);
  }
}

function removeProps(obj, keys) {
  if (obj instanceof Array) {
    obj.forEach(item => {
      removeProps(item, keys);
    });
  } else if (typeof obj === 'object') {
    Object.getOwnPropertyNames(obj).forEach(key => {
      if (keys.indexOf(key) !== -1) {
        console.log('Removing ', { key, obj });
        delete obj[key];
      } else {
        removeProps(obj[key], keys);
      }
    });
  }
}
