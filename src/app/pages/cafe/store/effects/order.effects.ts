import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CafeActions from "../actions/cafe.actions"
import * as ProductActions from "../actions/product.actions"
import * as CategoryActions from "../actions/category.actions"
import { catchError, map, of, switchMap, tap } from "rxjs";
import { SnackbarService } from "../../../../core/services/snackbar.service";
import { ProductService } from "../../../../core/services/product.service";
import { Store } from "@ngrx/store";

@Injectable()
export class ManageOrderEffects {
    constructor(private actions$: Actions, private store: Store) { }

    // getProductByCategory$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(ManageOrderActions.GetProductByCategory),
    //         // switchMap(action =>
    //         //     this.productService.getProductByCategory(action.category).pipe(map(response => {
    //         //         return ManageOrderActions.SetProductByCategory({ products: response })
    //         //     }),
    //         //         catchError(error => {
    //         //             return this.handleError(error)
    //         //         })
    //         //     )
    //         // )
    //         tap(action => {
    //             console.log('here')
    //             // return CategoryActions.GetCategory()
    //             // return ProductActions.GetProducts()
    //             return this.store.dispatch(ProductActions.GetProducts())
    //         })
    //     ), {
    //     dispatch: false
    // })
}