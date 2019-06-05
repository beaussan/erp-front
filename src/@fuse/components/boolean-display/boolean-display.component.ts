import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boolean-display',
  template: `
    <ng-container *ngIf="value; else other">
      <mat-icon>check</mat-icon>
    </ng-container>
    <ng-template #other>
      <mat-icon>clear</mat-icon>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class BooleanDisplayComponent implements OnInit {
  @Input() value = false;

  constructor() {}

  ngOnInit() {}
}
