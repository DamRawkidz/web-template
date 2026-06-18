
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { SeItem, routes } from 'src/app/core/data/navigator';
import { mat } from 'src/app/shared/shared';
import { CollapsableComponent } from '../menu/collapsable/collapsable.component';
import { BasicMenuComponent } from '../menu/basic-menu/basic-menu.component';
import { ActivatedRoute, NavigationEnd, Router, Routes } from '@angular/router';
import { filter } from 'rxjs/operators';
import { filterPermissionMenu, nestedFind, updateMenu } from 'src/app/core/util/menu-helper';
import { ApptokenService } from 'src/app/core/service/apptoken.service';


@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    mat,
    CollapsableComponent,
    BasicMenuComponent
]
})
export class MenuBarComponent implements OnInit {
  menus =  routes
  appToken = inject(ApptokenService)
  constructor(
    private r: Router
  ) {


    this.r.events.pipe(
      filter(r => r instanceof NavigationEnd)
    ).subscribe((event: any) => this.updateNavigator(event.url,this.menus))
  }


  ngOnInit(): void {
    const rights = this.appToken?.payload?.rights;
    if (Array.isArray(rights) && rights.length > 0) {
      this.menus = filterPermissionMenu(routes, this.appToken.payload);
    }
  }

  updateNavigator(_link: string, _routes: SeItem[]){
      let routes = nestedFind(_routes, _link)

      updateMenu(routes,routes.title, _link)

  }




  identify(index, item) {
    return index;
  }

}
