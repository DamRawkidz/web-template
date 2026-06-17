import { Routes } from '@angular/router';
import { LapdAssignmentsContainer } from './container/lapd-assignments/lapd-assignments.container';
import { DepartmentSettingContainer } from './container/department-setting/department-setting.container';
import { LapdProfileListContainer } from './container/lapd-profile-list/lapd-profile-list.container';
import { LapdProfileSettingContainer } from './container/lapd-profile-setting/lapd-profile-setting.container';
import { MonitorDashboardContainer } from './container/monitor-dashboard/monitor-dashboard.container';
import { SquadGroupSettingContainer } from './container/squad-group-setting/squad-group-setting.container';
import { lapdProfileUnsavedGuard } from './lapd-profile.guard';
import { LapdProfileRouterContainer } from './router/lapd-profile-router/lapd-profile-router.container';

export const LAPD_PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: LapdProfileRouterContainer,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LapdProfileListContainer,
      },
      {
        path: 'assignments',
        component: LapdAssignmentsContainer,
      },
      {
        path: 'monitor',
        component: MonitorDashboardContainer,
      },
      {
        path: 'departments',
        component: DepartmentSettingContainer,
      },
      {
        path: 'squad-groups',
        component: SquadGroupSettingContainer,
      },
      {
        path: 'new',
        component: LapdProfileSettingContainer,
        canDeactivate: [lapdProfileUnsavedGuard],
      },
      {
        path: 'add-user',
        component: LapdProfileSettingContainer,
        canDeactivate: [lapdProfileUnsavedGuard],
      },
      {
        path: ':id',
        component: LapdProfileSettingContainer,
        canDeactivate: [lapdProfileUnsavedGuard],
      },
    ],
  },
];
