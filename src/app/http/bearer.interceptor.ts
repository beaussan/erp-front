import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/auth.state';
import { catchError } from 'rxjs/operators';
import { Logout } from '../state/auth.actions';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(AuthState.token);
    let obs: Observable<HttpEvent<any>>;
    if (!token) {
      obs = next.handle(request);
    } else {
      obs = next.handle(this.addToken(request, token));
    }

    return obs.pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if ((error as HttpErrorResponse).status === 401) {
            this.store.dispatch(new Logout());
          }
        }
        return throwError(error);
      }),
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
