import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs";
import * as CafeActions from '../actions/cafe.actions'

@Injectable()
export class CafeEffects {
    constructor(private actions$: Actions) { }

    $clearFailureMessage = createEffect(() =>
        this.actions$.pipe(
            ofType(CafeActions.ActionFailure),
            map(_action => {
                console.log('cleared')
                return CafeActions.ClearFailureMessage()
            })
        )
    )
} 