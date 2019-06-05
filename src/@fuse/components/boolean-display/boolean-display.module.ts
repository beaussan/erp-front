import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanDisplayComponent } from './boolean-display.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [BooleanDisplayComponent],
  imports: [CommonModule, MatIconModule],
  exports: [BooleanDisplayComponent],
})
export class BooleanDisplayModule {}
