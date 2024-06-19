import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AuthFeature } from '../../pages/auth/store/auth.reducer';
import * as AuthActions from '../../pages/auth/store/auth.actions';

export const ResetAuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const snackbar = inject(MatSnackBar);
  const store = inject(Store);
  let allowRoute = false;

  store.dispatch(AuthActions.CheckResetTokenStart({ token: route.paramMap.get('token')! }))

  store.select(AuthFeature.selectAllowResetPassword).subscribe(value => {
    if (value) {
      allowRoute = true;
    }
    else {
      userService.navigate('');
      snackbar.open("Sorry ! we have not received any reset password request from you..", 'Close', {
        duration: 5000
      });
    }
  })

  return allowRoute;
  // return userService.checkResetToken(route.paramMap.get('token')!).pipe(map(((response: { message: boolean }) => {
  //   console.log(response.message)
  //   if (response.message) {
  //     return true;
  //   }
  //   else {
  //     userService.navigate('');
  //     return false;
  //   }
  // })),
  //   catchError(error => {
  //     console.log(error);
  //     userService.navigate(CONSTANTS.ROUTES.login);
  //     snackbar.open("Sorry ! we have not received any reset password request from you..", 'Close', {
  //       duration: 5000
  //     });
  //     return of(false);
  //   }))
};