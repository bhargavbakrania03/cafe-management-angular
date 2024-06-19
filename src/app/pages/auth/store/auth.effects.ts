import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../../core/services/user.service";
import * as AuthActions from "./auth.actions"
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { User } from "../../../core/models/auth.model";
import { SnackbarService } from "../../../core/services/snackbar.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private userService: UserService, private snackbarService: SnackbarService) { }

    handleError = (error: HttpErrorResponse) => {
        let errorMessage = 'Something went wrong !!';
        if (error.error.error) {
            errorMessage = error.error.error
        }
        else if (error.error.message) {
            errorMessage = error.error.message
        }
        this.snackbarService.openSnackbar(errorMessage)
        return of(AuthActions.ActionFailure({ error: errorMessage }))
    }

    $clearSuccessMessage = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.ActionSuccess, AuthActions.LoginSuccess),
            map(action =>
                AuthActions.ClearSuccessMessage()
            )
        )
    )

    $clearFailureMessage = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.ActionFailure),
            map(action =>
                AuthActions.ClearFailureMessage()
            )
        )
    )

    $login = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.LoginStart),
            exhaustMap(action =>
                this.userService.login(action.loginData)
                    .pipe(
                        map(response => {
                            console.log(response)
                            this.snackbarService.openSnackbar(response.message)
                            return AuthActions.LoginSuccess(response)
                        }),
                        catchError(error => {
                            return this.handleError(error);
                        })
                    )
            )
        )
    )

    $signUp = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.SignupStart),
            exhaustMap(action =>
                this.userService.signUp(action.signupData)
                    .pipe(
                        map((response: { message: string, user: User }) => {
                            this.snackbarService.openSnackbar(response.message)
                            return AuthActions.ActionSuccess({ message: response.message })
                        }),
                        catchError(error => {
                            return this.handleError(error);
                        })
                    )
            )
        )
    )

    $forgotPassword = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.ForgotPasswordStart),
            exhaustMap(action =>
                this.userService.forgotPassword(action.forgotPasswordData)
                    .pipe(
                        map((response) => {
                            console.log(response)
                            this.snackbarService.openSnackbar(response.message)
                            return AuthActions.ActionSuccess(response)
                        }),
                        catchError(error => {
                            return this.handleError(error);
                        })
                    )
            )
        )
    )

    $resetPassword = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.ResetPasswordStart),
            exhaustMap(action =>
                this.userService.resetPassword(action.resetPasswordData, action.resetToken)
                    .pipe(
                        map((response) => {
                            this.snackbarService.openSnackbar(response.message)
                            return AuthActions.ActionSuccess(response)
                        }),
                        catchError(error => {
                            return this.handleError(error);
                        })
                    )
            )
        )
    )

    $changePassword = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.ChangePasswordStart),
            exhaustMap(action =>
                this.userService.changePassword(action.changePasswordData)
                    .pipe(
                        map((response) => {
                            this.snackbarService.openSnackbar(response.message)
                            return AuthActions.ActionSuccess(response)
                        }),
                        catchError(error => {
                            return this.handleError(error);
                        })
                    )
            )
        )
    )

    $checkResetToken = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.CheckResetTokenStart),
            exhaustMap(action =>
                this.userService.checkResetToken(action.token)
                    .pipe(
                        map((response) => AuthActions.CheckResetTokenResult(response)),
                        catchError(error => {
                            return this.handleError(error);
                        })
                    )
            )
        )
    )

    $logout = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.Logout),
            tap(action =>
                this.userService.logout()
            )
        ), { dispatch: false })
}