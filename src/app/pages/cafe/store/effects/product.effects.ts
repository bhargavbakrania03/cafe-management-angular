import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../../../core/services/product.service";
import { SnackbarService } from "../../../../core/services/snackbar.service";
import { catchError, map, of, switchMap } from "rxjs";
import * as ProductActions from "../actions/product.actions";
import { handleError } from "../../../../shared/error";

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService, private snackbarService: SnackbarService) { }

    $getProducts = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.GetProducts),
            switchMap(action => {
                return this.productService.getProducts().pipe(map(response => {
                    // console.log(response)
                    return ProductActions.SetProducts({ products: response })
                }), catchError(error => {
                    return handleError(error);
                })
                )
            }
            )
        )
    })

    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.AddProduct),
            switchMap((action) => {
                return this.productService.addProduct(action.product).pipe(map(response => {
                    console.log(response)
                    this.productService.onAddProduct.emit();
                    this.snackbarService.openSnackbar(response.message)
                    return ProductActions.AddProductId({ product: response.product })
                }), catchError(error => {
                    console.log(error)
                    return handleError(error)
                }))
            })
        ))

    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.UpdateProduct),
            switchMap((action) => {
                return this.productService.updateProduct(action.product).pipe(map(response => {
                    console.log(response)
                    this.productService.onEditProduct.emit();
                    this.snackbarService.openSnackbar(response.message)
                }), catchError(error => {
                    console.log(error)
                    return handleError(error)
                }))
            })
        ), {
        dispatch: false,
    })

    changeProductStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.ChangeProductStatus),
            switchMap((action) => {
                return this.productService.updateStatus(action.id).pipe(map(response => {
                    console.log(response)
                    this.snackbarService.openSnackbar(response.message)
                }), catchError(error => {
                    console.log(error)
                    return handleError(error)
                }))
            })
        ), {
        dispatch: false,
    })

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.DeleteProduct),
            switchMap((action) => {
                return this.productService.deleteProduct(action.id).pipe(map(response => {
                    console.log(response)
                    this.snackbarService.openSnackbar(response.message)
                }), catchError(error => {
                    console.log(error)
                    return handleError(error)
                }))
            })
        ), {
        dispatch: false,
    })

}
