import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExsamComponent } from './exsam/exsam.component';
import {  RouterModule, Routes } from '@angular/router';
import { ExComponentChildrenComponent } from './exsam/components/ex-component-children/ex-component-children.component';



export const exsamRoutes: Routes = [
  {
    path:'',
    component: ExsamComponent,
    children: [
      {
        path: 'children',
        component: ExComponentChildrenComponent
      },
      {
        path: 'children/:childrenid',
        component: ExComponentChildrenComponent,
        data: {
          example: 'data from children'
        }
      }
    ]
  }
]


