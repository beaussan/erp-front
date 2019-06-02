import { Component, Input, OnInit } from '@angular/core';
import { ExtraModules } from '../../../../types';

@Component({
  selector: 'app-extra-module-detail',
  templateUrl: './extra-module-detail.component.html',
  styleUrls: ['./extra-module-detail.component.scss'],
})
export class ExtraModuleDetailComponent implements OnInit {
  @Input() extraModule: ExtraModules;

  constructor() {}

  ngOnInit() {}
}
