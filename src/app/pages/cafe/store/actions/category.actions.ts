import { createAction, props } from "@ngrx/store"
import { CategoryResponse } from "../../../../core/models/response.model"

export const GET_CATEGORY = '[Category] GET CATEGORY'
export const SET_CATEGORY = '[Category] SET CATEGORY'
export const ADD_CATEGORY = '[Category] ADD CATEGORY'
export const ADD_CATEGORY_ID = '[Category] ADD CATEGORY ID'
export const UPDATE_CATEGORY = '[Category] UPDATE CATEGORY'


export const GetCategory = createAction(GET_CATEGORY)
export const SetCategory = createAction(SET_CATEGORY, props<{ category: CategoryResponse[] }>())
export const AddCategory = createAction(ADD_CATEGORY, props<{ category: string }>())
export const AddCategoryId = createAction(ADD_CATEGORY_ID, props<{ category: CategoryResponse }>())
export const UpdateCategory = createAction(UPDATE_CATEGORY, props<{ category: CategoryResponse }>())
