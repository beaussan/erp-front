import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusableDirective } from './directives/focusable.directive';
import { EditModeDirective } from './directives/edit-mode.directive';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditableComponent } from './components/editable/editable.component';
import { EditableOnEnterDirective } from './directives/editable-on-enter.directive';

@NgModule({
  declarations: [
    FocusableDirective,
    EditModeDirective,
    ViewModeDirective,
    EditableComponent,
    EditableOnEnterDirective,
  ],
  imports: [CommonModule],
  exports: [
    FocusableDirective,
    EditModeDirective,
    ViewModeDirective,
    EditableComponent,
    EditableOnEnterDirective,
  ],
})
export class EditableModule {}
