import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { AuthenService } from '../service/authen.service';

export const authenGuard: CanActivateFn = (route, state) => {
  const authenSV = inject(AuthenService)
  return true
};


export const authenGuardChild: CanActivateChildFn = (
  routes,
  state,
) => authenGuard(routes,state)
