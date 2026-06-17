

import { ActivatedRouteSnapshot,  CanActivate,  CanActivateChildFn,  CanActivateFn,  Router, RouterStateSnapshot } from '@angular/router';

export const AuthGuad: CanActivateFn = (
  routes: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return true
}

export const AuthGuardChildern:CanActivateChildFn = (
  routes: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => AuthGuardChildern(routes,state)
