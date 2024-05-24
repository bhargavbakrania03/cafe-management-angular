import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, map, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const ResetAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const snackbar = inject(MatSnackBar);

  return userService.checkToken(route.paramMap.get('token')!).pipe(map(((response: { message: boolean }) => {
    console.log(response.message)
    if (response.message) {
      return true;
    }
    else {
      router.navigate(['']);
      return false;
    }
  })),
    catchError(error => {
      console.log(error);
      router.navigate(['']);
      snackbar.open("Invalid Token !", 'Close', {
        duration: 3000
      });
      return of(false);
    }))
};