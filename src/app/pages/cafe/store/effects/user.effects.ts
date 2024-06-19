import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserActions from '../actions/user.actions'
import { catchError, map, switchMap } from "rxjs";
import { UserService } from "../../../../core/services/user.service";
import { handleError } from "../../../../shared/error";
import { SnackbarService } from "../../../../core/services/snackbar.service";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userService: UserService, private snackbarService: SnackbarService) { }

    getUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.GetUsers),
            switchMap(action => {
                return this.userService.getUsers().pipe(
                    map(response => {
                        return UserActions.SetUsers({ users: response.users })
                    }),
                    catchError(error => {
                        return handleError(error);
                    })
                )
            })
        )
    )

    updateUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.UpdateUser),
            switchMap(action => {
                return this.userService.updateUser(action.id).pipe(
                    map(response => {
                        this.snackbarService.openSnackbar(response.message);
                    }),
                    catchError(error => {
                        return handleError(error);
                    })
                )
            })
        ), {
        dispatch: false,
    }
    )
}