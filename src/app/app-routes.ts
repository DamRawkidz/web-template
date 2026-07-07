import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthCallbackComponent } from './feature/auth-callback/auth-callback.component';
import { authenGuard } from './core/guards/authen.guard';



export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/example'
  },
  {
    path: 'auth-callback',
    loadChildren: () => import('./feature/auth-callback/routes').then(r => r.routes)
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    // canActivate: [localAuthGuard],
    // canActivateChild: [localAuthChildGuard],
    children: [
      {
        path: 'example',
        loadChildren: () => import('./feature/exsam/exsam.routes').then(r => r.exsamRoutes),
        data: {
          example: 'dataWithId',
          data2: 'testdata2'
        }
      },
      {
        path: 'example1',
        loadChildren: () => import('./feature/exsam/exsam.routes').then(r => r.exsamRoutes),
        data: {
          example: 'dataWithId'
        }
      },
      {
        path: 'example/:id',
        loadChildren: () => import('./feature/exsam/exsam.routes').then(r => r.exsamRoutes),
        data: {
          example: 'data'
        }
      },
      {
        path: 'demo',
        loadChildren: () => import('./feature/demo-feature/routes').then(r => r.ROUTER)
      }
    ]
  }
];
