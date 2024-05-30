import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { CONSTANTS } from '../../utils/constants';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const snackbar = inject(MatSnackBar);

  if (userService.getLoginToken()) {
    let expectedRoleList: any = route.data;
    let token: string = localStorage.getItem(CONSTANTS.AUTH_TOKEN)!;
    let tokenPayload: TokenPayload, checkRole: boolean = false;

    expectedRoleList = expectedRoleList['expectedRole'];

    try {
      tokenPayload = jwtDecode(token);

      for (let i = 0; i < expectedRoleList.length; i++) {
        if (expectedRoleList[i] === tokenPayload.role) {
          checkRole = true;
        }
      }

      if ((tokenPayload.role === 'user' || tokenPayload.role === 'admin')) {
        if (checkRole) {
          return true;
        }
      }
      snackbar.open(CONSTANTS.ERROR.auth_error, 'Close', {
        duration: 5000,
      })
      userService.navigate(CONSTANTS.ROUTES.dashboard);
      return false;
    }
    catch (error) {
      userService.logout();
    }
  }
  else {
    userService.logout();
    return false;
  }
  userService.navigate(CONSTANTS.ROUTES.login);
  return false;
};
