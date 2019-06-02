import { Component, Input, OnInit } from '@angular/core';
import { ItemExtra } from '../../../../types';

@Component({
  selector: 'app-extra-module-item-detail',
  templateUrl: './extra-module-item-detail.component.html',
  styleUrls: ['./extra-module-item-detail.component.scss'],
})
export class ExtraModuleItemDetailComponent implements OnInit {
  @Input() extraModuleDetail: ItemExtra;

  constructor() {}

  ngOnInit() {}
}
