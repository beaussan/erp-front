import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { MatDialog } from '@angular/material';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { filter, switchMap, switchMapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeleteModalService {
  constructor(private readonly store: Store, private readonly dialog: MatDialog) {}

  askForConfirmation(label: string, action: any): void {
    this.dialog
      .open(DeleteModalComponent, {
        data: { name: label },
      })
      .afterClosed()
      .pipe(
        tap(v => console.log('TOTO', v)),
        filter(val => val === true),
        switchMap(() => this.store.dispatch(action)),
      )
      .subscribe(() => console.log('TOOOO'));
  }
}
