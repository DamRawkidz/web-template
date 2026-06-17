import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeItem } from 'src/app/core/data/navigator';
import { mat } from 'src/app/shared/shared';

@Component({
    selector: 'app-basic-menu',
    templateUrl: './basic-menu.component.html',
    styleUrls: ['./basic-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        mat,
        RouterModule
    ]
})
export class BasicMenuComponent implements OnInit {
  @Input() item: SeItem
  constructor() { }

  ngOnInit(): void {
  }

}
