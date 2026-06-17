import { Routes } from "@angular/router";
import { DemoFeatureRouterContainer } from "./router/demo-feature-router/demo-feature-router.container";
import { DemoFeatureContainer } from "./container/demo-feature/demo-feature.container";
import { DemoFeatureFormComponent } from "./presenter/demo-feature-form/demo-feature-form.component";

export const ROUTER: Routes = [
  {
    path: '',
    component: DemoFeatureRouterContainer,
    children: [
      {
        path: '',
        component: DemoFeatureContainer
      },
      {
        path: 'add',
        component: DemoFeatureFormComponent
      },
      {
        path: 'edit/:id',
        component: DemoFeatureFormComponent
      },
    ]
  }
]
