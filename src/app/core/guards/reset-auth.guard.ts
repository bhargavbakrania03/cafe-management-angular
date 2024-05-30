import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, map, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONSTANTS } from '../../utils/constants';

export const ResetAuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const snackbar = inject(MatSnackBar);

  return userService.checkResetToken(route.paramMap.get('token')!).pipe(map(((response: { message: boolean }) => {
    console.log(response.message)
    if (response.message) {
      return true;
    }
    else {
      userService.navigate('');
      return false;
    }
  })),
    catchError(error => {
      console.log(error);
      userService.navigate(CONSTANTS.ROUTES.login);
      snackbar.open("Sorry ! we have not received any reset password request from you..", 'Close', {
        duration: 5000
      });
      return of(false);
    }))
};