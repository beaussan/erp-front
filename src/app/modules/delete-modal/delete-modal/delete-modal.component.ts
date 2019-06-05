import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-delete-modal',
  template: `
    <h1 mat-dialog-title>Suprimmer {{ data.name }}</h1>
    <div mat-dialog-content>Etes vous sur de suprimmer le {{ data.name }} ?</div>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Annuler</button>
      <button mat-raised-button [mat-dialog-close]="true" cdkFocusInitial color="warn">
        Suprimer
      </button>
    </mat-dialog-actions>
  `,
  styles: [],
})
export class DeleteModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {}
}
