import { CommonModule } from '@angular/common';
import { ToolBarComponent } from '../components/tool-bar/tool-bar.component';
import { MenuBarComponent } from './../components/menu-bar/menu-bar.component';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    imports: [
        MenuBarComponent,
        ToolBarComponent,
        CommonModule,
        RouterModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {
  isExpanedMenu: Boolean
  constructor() { }

  ngOnInit(): void {
  }



}
