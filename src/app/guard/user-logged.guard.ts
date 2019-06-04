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
import { filter, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root',
})
export class UserLoggedGuard implements CanActivate, CanActivateChild {
  constructor(private readonly store: Store) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isOK();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isOK();
  }

  private isOK(): Observable<boolean> {
    return this.store.select(AuthState.hasTriedToLogin).pipe(
      filter(val => val === true),
      take(1),
      switchMapTo(this.store.selectOnce(AuthState.userLogged)),
      tap(val => {
        if (!val) {
          this.store.dispatch(new Navigate(['auth']));
        }
      }),
    );
  }
}
