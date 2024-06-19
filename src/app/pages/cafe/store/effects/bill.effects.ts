import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as BillActions from '../actions/bill.actions';
import { catchError, exhaustMap, map } from "rxjs";
import { BillService } from "../../../../core/services/bill.service";
import { handleError } from "../../../../shared/error";
import { Store } from "@ngrx/store";
import { SnackbarService } from "../../../../core/services/snackbar.service";

@Injectable()
export class BillEffects {
    constructor(private actions$: Actions, private billService: BillService, private store: Store, private snackbarService: SnackbarService) { }

    generateReport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillActions.GenerateBill),
            exhaustMap(action =>
                this.billService.generateReport(action.billData).pipe(
                    map(response => {
                        console.log(response)
                        return BillActions.StoreBlob({ blob: response });
                    }),
                    catchError(error =>
                        handleError(error)
                    )
                )
            )
        ))

    clearBlob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillActions.StoreBlob),
            map(action => {
                console.log('inside clear Blob')
                return BillActions.ClearBlob();
            })
        ))

    getBills$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillActions.GetBillData),
            exhaustMap(action =>
                this.billService.getBills().pipe(
                    map(response => {
                        return BillActions.SetBillData({ bills: response });
                    }),
                    catchError(error =>
                        handleError(error)
                    )
                )
            )
        ))

    getPDF$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillActions.GetPDF),
            exhaustMap(action =>
                this.billService.getPDF(action.data).pipe(
                    map(response => {
                        return BillActions.StorePDF({ pdf: response });
                    }),
                    catchError(error =>
                        handleError(error)
                    )
                )
            )
        ))

    clearPdf$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillActions.StorePDF),
            map(_action => {
                console.log('here in clear PDF')
                return BillActions.ClearPDF();
                // return this.store.dispatch(BillActions.ClearPDF());
            })
        ))

    deleteBill$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillActions.DeleteBill),
            exhaustMap(action => {
                return this.billService.delete(action.id).pipe(map(response =>
                    this.snackbarService.openSnackbar(response.message)
                ), catchError(error =>
                    handleError(error)
                ))
            })
        ),
        {
            dispatch: false
        })
}