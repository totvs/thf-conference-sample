import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../login/login.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
