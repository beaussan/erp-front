import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { EditModeDirective } from '../../directives/edit-mode.directive';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMapTo, take } from 'rxjs/operators';
import { ViewModeDirective } from '../../directives/view-mode.directive';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-editable',
  template: `
    <ng-container *ngTemplateOutlet="currentView"></ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
        cursor: pointer;
      }
    `,
  ],
})
export class EditableComponent implements OnInit, OnDestroy {
  @ContentChild(ViewModeDirective, { static: true }) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective, { static: true }) editModeTpl: EditModeDirective;
  @Output() update = new EventEmitter();

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  mode: 'view' | 'edit' = 'view';

  constructor(private host: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  toViewMode() {
    this.update.next();
    this.mode = 'view';
  }

  private get element() {
    return this.host.nativeElement;
  }

  private viewModeHandler() {
    fromEvent(this.element, 'dblclick')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.mode = 'edit';
        this.editMode.next(true);

        this.cdr.detectChanges();
      });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1),
    );

    this.editMode$
      .pipe(
        switchMapTo(clickOutside$),
        untilDestroyed(this),
      )
      .subscribe(event => {
        this.toViewMode();
        this.cdr.detectChanges();
      });
  }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  ngOnDestroy() {}
}
