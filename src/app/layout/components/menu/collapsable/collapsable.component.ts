import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { SeItem } from 'src/app/core/data/navigator';
import { SEAnimations } from 'src/app/shared/animations/animations';
import { mat } from 'src/app/shared/shared';
import { BasicMenuComponent } from '../basic-menu/basic-menu.component';

@Component({
    selector: 'app-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls: ['./collapsable.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    animations: SEAnimations,
    imports: [
        CommonModule,
        mat,
        BasicMenuComponent
    ]
})
export class CollapsableComponent implements OnInit {
  isCollapsed: boolean = true;
  isExpanded: boolean = false;

  @HostBinding('class') get classList(): any
    {
        return {
            'se_item_collapsed': this.isCollapsed,
            'se_item_expanded' : this.isExpanded
        };
    }

  @Input() item: SeItem

  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapsable(){

    if ( this.isCollapsed )
        {
            this.expand();
        }
        else
        {
            this.collapse();
        }

  }

  expand(): void
    {
        // Return if the item is disabled
        if ( this.item.disabled )
        {
            return;
        }

        // Return if the item is already expanded
        if ( !this.isCollapsed )
        {
            return;
        }

        // Expand it
        this.isCollapsed = false;
        this.isExpanded = !this.isCollapsed;

        // Mark for check

    }

    collapse(): void
    {
        // Return if the item is disabled
        if ( this.item.disabled )
        {
            return;
        }

        // Return if the item is already collapsed
        if ( this.isCollapsed )
        {
            return;
        }

        // Collapse it
        this.isCollapsed = true;
        this.isExpanded = !this.isCollapsed;

        // Mark for check

    }

    identify(index, item) {
      return index;
    }



}
