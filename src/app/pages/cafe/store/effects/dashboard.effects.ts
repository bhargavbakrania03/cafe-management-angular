import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as DashboardActions from "../actions/dashboard.actions"
import { catchError, map, of, switchMap } from "rxjs";
import { DashboardService } from "../../../../core/services/dashboard.service";
import { SnackbarService } from "../../../../core/services/snackbar.service";
import { handleError } from "../../../../shared/error";

@Injectable()
export class DashboardEffects {
    constructor(private actions$: Actions, private dashboardService: DashboardService, private snackbarService: SnackbarService) { }

    getDashboardData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardActions.GetDashboardData),
            switchMap(action =>
                this.dashboardService.getDetails().pipe(map(response => {
                    return DashboardActions.SetDashboardData({ data: response })
                }),
                    catchError(error => {
                        return handleError(error);
                    })
                )
            )))
}