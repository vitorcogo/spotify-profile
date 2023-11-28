
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthHelper } from '../helpers/auth.helper';

@Injectable()
export class LoginGuard {
  constructor(public router: Router) {}
  canActivate(): boolean {
    if (AuthHelper.isAuthenticated()) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
