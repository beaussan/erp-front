import { Injectable } from '@angular/core';
import { FailedLoginUser } from '../state/auth.actions';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { MatSnackBar } from '@angular/material';

interface ToastableItem {
  message: string;
  action: any;
}

const toasts: ToastableItem[] = [
  {
    action: FailedLoginUser,
    message: 'Login / Password pas valide',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private readonly actions$: Actions, private readonly snackBar: MatSnackBar) {}

  public setupToaster() {
    for (const toast of toasts) {
      this.actions$.pipe(ofActionDispatched(toast.action)).subscribe(() => {
        this.snackBar.open(toast.message);
      });
    }
  }
}
