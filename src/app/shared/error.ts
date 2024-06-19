import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import * as CafeActions from '../pages/cafe/store/actions/cafe.actions';

export const handleError = (error: HttpErrorResponse) => {
    let errorMessage = 'Something went wrong !!';
    if (error.error.error) {
        errorMessage = error.error.error
    }
    else if (error.error.message) {
        errorMessage = error.error.message
    }
    return of(CafeActions.ActionFailure({ error: errorMessage }))
}