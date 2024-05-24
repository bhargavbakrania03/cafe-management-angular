import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const LoginGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router)
  if (userService.getLoginToken()) {
    return router.navigate(['/dashboard']);
  }
  return true;
};
