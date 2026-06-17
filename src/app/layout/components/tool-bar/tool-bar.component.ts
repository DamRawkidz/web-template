import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/core/service/authen.service';

import { mat } from 'src/app/shared/shared';


@Component({
    selector: 'app-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls: ['./tool-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        mat,
        CommonModule
    ]
})
export class ToolBarComponent implements OnInit {

  isExpanded: boolean = false
  @Output() expanedMenu = new EventEmitter<boolean>()
  authenSV = inject(AuthenService)
  
  router = inject(Router)
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.isExpanded = !this.isExpanded
    this.expanedMenu.emit(this.isExpanded)
  }

  logout(){
    this.router.navigate(['/login'])
  }

}
