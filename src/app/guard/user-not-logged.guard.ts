import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/auth.state';
import { map, tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root',
})
export class UserNotLoggedGuard implements CanActivate, CanActivateChild {
  constructor(private readonly store: Store) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isOk();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isOk();
  }

  private isOk(): Observable<boolean> {
    return this.store.selectOnce(AuthState.userLogged).pipe(
      map(val => !val),
      tap(val => {
        if (!val) {
          this.store.dispatch(new Navigate(['/']));
        }
      }),
    );
  }
}
