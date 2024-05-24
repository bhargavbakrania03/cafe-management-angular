import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router)
  const cur_route = route;
  console.log(cur_route.data);

  if (userService.getLoginToken()) {
    return true;
  }
  return router.navigate(['/login']);
};
