import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CatgoryActions from "../actions/category.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { CategoryService } from "../../../../core/services/category.service";
import { SnackbarService } from "../../../../core/services/snackbar.service";
import { handleError } from "../../../../shared/error";

@Injectable()
export class CategoryEffects {

    constructor(private actions$: Actions, private categoryService: CategoryService, private snackbarService: SnackbarService) { }

    getCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CatgoryActions.GetCategory),
            switchMap(action =>
                this.categoryService.getCategory().pipe(map(response => {
                    return CatgoryActions.SetCategory({ category: response })
                }),
                    catchError(error => {
                        return handleError(error);
                    })
                )
            )
        ))

    addCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CatgoryActions.AddCategory),
            switchMap((action) => {
                return this.categoryService.add(action).pipe(map(response => {
                    console.log(response)
                    this.categoryService.onAddCategory.emit();
                    this.snackbarService.openSnackbar(response.message)
                    return CatgoryActions.AddCategoryId({ category: response.newCategory })
                }
                ), catchError(error => {
                    console.log(error)
                    return handleError(error)
                }))
            })
        ))

    updateCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CatgoryActions.UpdateCategory),
            switchMap((action) => {
                return this.categoryService.update(action.category).pipe(map(response => {
                    console.log(response)
                    this.categoryService.onEditCategory.emit();
                    this.snackbarService.openSnackbar(response.message)
                }
                ), catchError(error => {
                    console.log(error)
                    return handleError(error)
                }))
            })
        ), {
        dispatch: false
    })
}