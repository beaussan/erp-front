import { Component, Input, OnInit } from '@angular/core';
import { Module } from '../../../../types';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
})
export class ModuleDetailComponent implements OnInit {
  @Input() module: Module;

  constructor() {}

  ngOnInit() {}
}
