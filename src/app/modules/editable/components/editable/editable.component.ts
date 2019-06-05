import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { EditModeDirective } from '../../directives/edit-mode.directive';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, map, pluck, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { ViewModeDirective } from '../../directives/view-mode.directive';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute, Route } from '@angular/router';
import { Store } from '@ngxs/store';
import { Maquette } from '../../../../types';
import { MaquetteState } from '../../../../state/maquette.state';

@Component({
  selector: 'app-editable',
  template: `
    <ng-container *ngTemplateOutlet="currentView"></ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      :host.writable {
        cursor: pointer;
      }
    `,
  ],
})
export class EditableComponent implements OnInit, OnDestroy {
  @ContentChild(ViewModeDirective, { static: true }) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective, { static: true }) editModeTpl: EditModeDirective;
  @Output() update = new EventEmitter();

  isCurrentMaquetteReadOnly$: Observable<boolean>;

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  @HostBinding('class.writable') isWriteMode = false;

  mode: 'view' | 'edit' = 'view';

  constructor(
    private host: ElementRef,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private readonly store: Store,
  ) {
    this.isCurrentMaquetteReadOnly$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(params => this.store.select(MaquetteState.byId).pipe(map(fn => fn(params)))),
      pluck('inProduction'),
    );
    this.isCurrentMaquetteReadOnly$.pipe(untilDestroyed(this)).subscribe(val => {
      this.isWriteMode = val === false;
    });
  }

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
      .pipe(
        untilDestroyed(this),
        switchMapTo(this.isCurrentMaquetteReadOnly$.pipe(take(1))),
        filter(val => val === false),
      )
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
