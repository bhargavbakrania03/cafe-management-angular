import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { CONSTANTS } from '../../utils/constants';

export const LoginGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);

  if (userService.getLoginToken()) {
    userService.navigate(CONSTANTS.ROUTES.dashboard);
    return false;
  }
  return true;
};
