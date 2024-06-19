import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { CONSTANTS } from '../../utils/constants';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const userService = inject(UserService);
  let token: string = userService.getLoginToken()!;

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req).pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse) {
        if ((err.status === 401 || err.status === 403) && router.url !== '/') {
          userService.logout();
        }
      }
      return throwError(() => err);
    })
  );
};
