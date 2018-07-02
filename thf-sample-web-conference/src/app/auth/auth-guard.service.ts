import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { LoginService } from '../login/login.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    this.loginService.isLoggedIn().then(ret => {
      if (ret) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
    return true;
  }

}
